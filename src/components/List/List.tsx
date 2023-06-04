import styles from './List.module.scss';

const List = ({children}: {children?: React.ReactNode}) => {

    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}

export default List;