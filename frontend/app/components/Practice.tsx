import styles from "./Practice.module.css";

// Producer and Curator share the right column. DJ is deliberately not in
// this array — it is the featured left block and gets its own centered
// treatment, mirroring the reference WRITTEN section's featured/list split.
const SUPPORTING_ROLES = [
  {
    title: "Producer",
    body: "Temikaze’s releases include Nia, Let Go and Gone, alongside No Fears with Aleree.",
  },
  {
    title: "Curator",
    body: "Temikaze co-founded TG & fRenz with Gigi.",
  },
];

export default function Practice() {
  return (
    <section id="practice" className={styles.practice}>
      {/* Heading only. The reference's descriptor and "view all" are
          deliberately absent: no descriptor copy was supplied, and Practice
          has no archive for a "view all" to point at. */}
      <div className={`container ${styles.headerRow}`}>
        <h2 className={styles.heading}>Practice</h2>
      </div>

      <div className={`container ${styles.grid}`}>
        <div className={styles.featured}>
          <h3 className={styles.featuredTitle}>DJ</h3>
          <p className={styles.featuredBody}>
            Nairobi-based House and Afro House DJ.
          </p>
        </div>

        <div className={styles.supporting}>
          {SUPPORTING_ROLES.map((role) => (
            <article key={role.title} className={styles.role}>
              <h3 className={styles.roleTitle}>{role.title}</h3>
              <p className={styles.roleBody}>{role.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
