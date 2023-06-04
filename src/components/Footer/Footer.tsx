import styles from './Footer.module.scss';


const Footer = () => {

    return (
        <footer className={styles.wrapper}>
            <div className={styles.arch_info}>
                <div className={styles.label}>Количество страниц в папке:</div>
                <div className={styles.value}>10</div>
            </div>
        </footer>
    )
}

export default Footer;