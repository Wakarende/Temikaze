import type {
  ArtistContent,
  ContactContent,
  GalleryItem,
  HeroStatusCard,
  MediaAsset,
  MusicItem,
  SiteContent,
} from "./siteContent";

type RenderedField = {
  rendered: string;
};

type ArtistProfileMeta = {
  artist_bio_image_id: number;
  tagline: string;
  booking_email: string;
  instagram_url: string;
  tiktok_url: string;
  youtube_url: string;
  soundcloud_url: string;
  linktree_url: string;
};

type ReleaseMeta = {
  release_date: string;
  preview_audio_id: number;
  external_url: string;
};

type MixMeta = {
  publish_date: string;
  preview_audio_id: number;
  external_url: string;
};

type WordPressPost<TMeta> = {
  id: number;
  slug: string;
  title: RenderedField;
  content?: RenderedField;
  featured_media: number;
  menu_order?: number;
  meta: TMeta;
};

type WordPressMedia = {
  id: number;
  source_url: string;
  media_type: string;
  mime_type: string;
  alt_text: string;
  media_details?: {
    width?: number;
    height?: number;
  };
};

const WORDPRESS_API_PATH = "/wp-json/wp/v2";

const getWordPressBaseUrl = () => {
  const value = process.env.WORDPRESS_URL?.trim().replace(/\/+$/, "");
  if (!value) {
    throw new Error(
      "WORDPRESS_URL is not configured. Set it to the WordPress site origin, for example http://localhost:8881."
    );
  }

  return value;
};

const fetchWordPress = async <T>(
  route: string,
  parameters: Record<string, string> = {}
) => {
  const url = new URL(`${getWordPressBaseUrl()}${WORDPRESS_API_PATH}${route}`);
  Object.entries(parameters).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    const detail = (await response.text()).slice(0, 300);
    throw new Error(
      `WordPress REST request failed (${response.status}) for ${url.toString()}: ${detail}`
    );
  }

  return (await response.json()) as T;
};

const requireText = (value: unknown, field: string) => {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`WordPress field ${field} is required but empty.`);
  }

  return value.trim();
};

const requireId = (value: unknown, field: string) => {
  if (!Number.isInteger(value) || Number(value) <= 0) {
    throw new Error(`WordPress field ${field} must contain an attachment ID.`);
  }

  return Number(value);
};

const requireUrl = (value: unknown, field: string) => {
  const text = requireText(value, field);
  let url: URL;

  try {
    url = new URL(text);
  } catch {
    throw new Error(`WordPress field ${field} must contain an absolute URL.`);
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`WordPress field ${field} must use http or https.`);
  }

  return url.toString();
};

const decodeEntities = (value: string) => {
  const namedEntities: Record<string, string> = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };

  return value.replace(
    /&(#x[\da-f]+|#\d+|amp|apos|gt|lt|nbsp|quot);/gi,
    (entity, code: string) => {
      if (code.startsWith("#x") || code.startsWith("#X")) {
        return String.fromCodePoint(Number.parseInt(code.slice(2), 16));
      }
      if (code.startsWith("#")) {
        return String.fromCodePoint(Number.parseInt(code.slice(1), 10));
      }
      return namedEntities[code.toLowerCase()] ?? entity;
    }
  );
};

const renderedText = (field: RenderedField, name: string) =>
  decodeEntities(requireText(field?.rendered, name).replace(/<[^>]*>/g, ""));

const biographyParagraphs = (content: RenderedField | undefined) => {
  const rendered = requireText(content?.rendered, "artist_profile.content");
  const paragraphs = Array.from(
    rendered.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi),
    (match) => decodeEntities(match[1].replace(/<[^>]*>/g, "")).trim()
  ).filter(Boolean);

  if (paragraphs.length === 0) {
    throw new Error(
      "WordPress artist_profile.content does not contain any biography paragraphs."
    );
  }

  return paragraphs;
};

const requireDate = (value: unknown, field: string) => {
  const date = requireText(value, field);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) {
    throw new Error(`WordPress field ${field} must use YYYY-MM-DD.`);
  }

  return date;
};

const resolveImage = (
  mediaById: Map<number, WordPressMedia>,
  id: number,
  field: string
): MediaAsset => {
  const media = mediaById.get(id);
  if (!media) {
    throw new Error(`WordPress media ${id} referenced by ${field} was not found.`);
  }
  if (!media.mime_type.startsWith("image/")) {
    throw new Error(`WordPress media ${id} referenced by ${field} is not an image.`);
  }

  const width = media.media_details?.width;
  const height = media.media_details?.height;
  if (!width || !height) {
    throw new Error(`WordPress image ${id} referenced by ${field} has no dimensions.`);
  }

  return {
    id,
    src: requireUrl(media.source_url, `media.${id}.source_url`),
    alt: requireText(media.alt_text, `media.${id}.alt_text`),
    width,
    height,
  };
};

const resolveAudioUrl = (
  mediaById: Map<number, WordPressMedia>,
  id: number,
  field: string
) => {
  const media = mediaById.get(id);
  if (!media) {
    throw new Error(`WordPress media ${id} referenced by ${field} was not found.`);
  }
  if (!media.mime_type.startsWith("audio/")) {
    throw new Error(`WordPress media ${id} referenced by ${field} is not audio.`);
  }

  const source = new URL(requireUrl(media.source_url, `media.${id}.source_url`));
  const wordpressOrigin = new URL(getWordPressBaseUrl()).origin;
  const uploadsPath = "/wp-content/uploads/";
  if (
    source.origin !== wordpressOrigin ||
    !source.pathname.startsWith(uploadsPath) ||
    source.username ||
    source.password ||
    source.search ||
    source.hash
  ) {
    throw new Error(`WordPress audio ${id} must use the configured CMS uploads origin.`);
  }

  return `/cms-audio/${source.pathname.slice(uploadsPath.length)}`;
};

const normalizeMusicItem = (
  post: WordPressPost<ReleaseMeta | MixMeta>,
  type: "release" | "mix",
  date: string,
  mediaById: Map<number, WordPressMedia>
): MusicItem => {
  const artwork = resolveImage(
    mediaById,
    requireId(post.featured_media, `${type}.${post.id}.featured_media`),
    `${type}.${post.id}.featured_media`
  );
  const previewAudioId = requireId(
    post.meta.preview_audio_id,
    `${type}.${post.id}.preview_audio_id`
  );

  return {
    id: `${type}-${post.id}`,
    title: renderedText(post.title, `${type}.${post.id}.title`),
    year: Number(date.slice(0, 4)),
    date,
    type,
    artwork: artwork.src,
    artworkAlt: artwork.alt,
    preview: resolveAudioUrl(
      mediaById,
      previewAudioId,
      `${type}.${post.id}.preview_audio_id`
    ),
    url: requireUrl(post.meta.external_url, `${type}.${post.id}.external_url`),
  };
};

export const getSiteContent = async (): Promise<SiteContent> => {
  const collectionFields = "id,slug,title,content,featured_media,menu_order,meta";
  const [artistProfiles, releases, mixes, gallery] = await Promise.all([
    fetchWordPress<WordPressPost<ArtistProfileMeta>[]>("/artist_profile", {
      status: "publish",
      per_page: "1",
      _fields: collectionFields,
    }),
    fetchWordPress<WordPressPost<ReleaseMeta>[]>("/releases", {
      status: "publish",
      per_page: "100",
      _fields: collectionFields,
    }),
    fetchWordPress<WordPressPost<MixMeta>[]>("/mixes", {
      status: "publish",
      per_page: "100",
      _fields: collectionFields,
    }),
    fetchWordPress<WordPressPost<Record<string, never>>[]>("/gallery", {
      status: "publish",
      per_page: "100",
      orderby: "menu_order",
      order: "asc",
      _fields: collectionFields,
    }),
  ]);

  const artistProfile = artistProfiles[0];
  if (!artistProfile) {
    throw new Error("WordPress has no published artist_profile record.");
  }
  if (releases.length === 0 || mixes.length === 0) {
    throw new Error("WordPress must contain at least one release and one mix.");
  }
  if (gallery.length !== 6) {
    throw new Error(
      `WordPress gallery must contain exactly six published records; received ${gallery.length}.`
    );
  }

  const mediaIds = new Set<number>([
    requireId(artistProfile.featured_media, "artist_profile.featured_media"),
    requireId(
      artistProfile.meta.artist_bio_image_id,
      "artist_profile.artist_bio_image_id"
    ),
    ...releases.flatMap((release) => [
      requireId(release.featured_media, `release.${release.id}.featured_media`),
      requireId(
        release.meta.preview_audio_id,
        `release.${release.id}.preview_audio_id`
      ),
    ]),
    ...mixes.flatMap((mix) => [
      requireId(mix.featured_media, `mix.${mix.id}.featured_media`),
      requireId(mix.meta.preview_audio_id, `mix.${mix.id}.preview_audio_id`),
    ]),
    ...gallery.map((item) =>
      requireId(item.featured_media, `gallery.${item.id}.featured_media`)
    ),
  ]);

  const media = await Promise.all(
    Array.from(mediaIds, (id) =>
      fetchWordPress<WordPressMedia>(`/media/${id}`, {
        _fields:
          "id,source_url,media_type,mime_type,alt_text,media_details",
      })
    )
  );
  const mediaById = new Map(media.map((item) => [item.id, item]));

  const releaseItems = releases
    .map((release) => {
      const date = requireDate(
        release.meta.release_date,
        `release.${release.id}.release_date`
      );
      return normalizeMusicItem(release, "release", date, mediaById);
    })
    .sort((first, second) => second.date.localeCompare(first.date));

  const mixItems = mixes
    .map((mix) => {
      const date = requireDate(mix.meta.publish_date, `mix.${mix.id}.publish_date`);
      return normalizeMusicItem(mix, "mix", date, mediaById);
    })
    .sort((first, second) => second.date.localeCompare(first.date));

  const musicItems = [...releaseItems, ...mixItems].sort((first, second) =>
    second.date.localeCompare(first.date)
  );
  const latestRelease = releaseItems[0];
  const latestMix = mixItems[0];

  const heroStatusCards: HeroStatusCard[] = [
    {
      href: "#music",
      musicItemId: latestRelease.id,
      eyebrow: "Latest Release",
      title: latestRelease.title,
      tone: "release",
    },
    {
      href: "#music",
      musicItemId: latestMix.id,
      eyebrow: "Latest Mix",
      title: latestMix.title,
      tone: "mix",
    },
  ];

  const artist: ArtistContent = {
    title: renderedText(artistProfile.title, "artist_profile.title"),
    tagline: requireText(artistProfile.meta.tagline, "artist_profile.tagline"),
    biography: biographyParagraphs(artistProfile.content),
    heroImage: resolveImage(
      mediaById,
      artistProfile.featured_media,
      "artist_profile.featured_media"
    ),
    bioImage: resolveImage(
      mediaById,
      artistProfile.meta.artist_bio_image_id,
      "artist_profile.artist_bio_image_id"
    ),
  };

  const contact: ContactContent = {
    email: requireText(
      artistProfile.meta.booking_email,
      "artist_profile.booking_email"
    ),
    linktree: {
      id: "linktree",
      label: "linktree",
      href: requireUrl(
        artistProfile.meta.linktree_url,
        "artist_profile.linktree_url"
      ),
    },
    socialLinks: [
      {
        id: "instagram",
        label: "instagram",
        href: requireUrl(
          artistProfile.meta.instagram_url,
          "artist_profile.instagram_url"
        ),
      },
      {
        id: "tiktok",
        label: "tiktok",
        href: requireUrl(
          artistProfile.meta.tiktok_url,
          "artist_profile.tiktok_url"
        ),
      },
      {
        id: "youtube",
        label: "youtube",
        href: requireUrl(
          artistProfile.meta.youtube_url,
          "artist_profile.youtube_url"
        ),
      },
      {
        id: "soundcloud",
        label: "soundcloud",
        href: requireUrl(
          artistProfile.meta.soundcloud_url,
          "artist_profile.soundcloud_url"
        ),
      },
    ],
  };

  const galleryItems: GalleryItem[] = gallery.map((item) => {
    const image = resolveImage(
      mediaById,
      item.featured_media,
      `gallery.${item.id}.featured_media`
    );
    return {
      id: `gallery-${item.id}`,
      src: image.src,
      alt: image.alt,
    };
  });

  return {
    artist,
    contact,
    heroStatusCards,
    musicItems,
    galleryItems,
  };
};
