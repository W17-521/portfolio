import styles from './ContactFooter.module.css';

export default function ContactFooter() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.title}>一起创造点什么</h2>
        <div className={styles.divider} />
        <p className={styles.invite}>
          期待与您合作，共同探索设计 × 技术的无限可能
        </p>
        <a href="mailto:2191017783@qq.com" className={styles.btn}>
          发送邮件 →
        </a>
        <div className={styles.infoRow}>
          <span>✉ 2191017783@qq.com</span>
          <span className={styles.infoSep}>|</span>
          <span>✆ 18991557566</span>
        </div>
        <img
          src="/signature.png"
          alt="吴应晴签名"
          className={styles.signature}
        />
        <p className={styles.copyright}>© 2025 吴应晴</p>
      </div>
    </section>
  );
}
