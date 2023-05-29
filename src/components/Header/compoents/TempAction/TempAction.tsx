import styles from './TempAction.module.scss';
import Button from '../../../Button/Button';

const TempAction = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.label}>Согласия на обработку</div>
            <div className={styles.action}>
                <Button
                    isRound
                    text='Изменить'
                    />   
            </div>
        </div>
    )
}


export default TempAction;