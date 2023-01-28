import classnames from 'classnames';
import styles from 'styles/alerts.module.css';
import { NWSFeature } from "types/Weather";

interface AlertProps {
    alert: NWSFeature
}

const Alert = ({alert}: AlertProps): JSX.Element => {
    if (!alert) return <></>
    return <>
        <div className={classnames(styles.alertText, styles.alertContainer)}>
            <div style={{}}><b>{alert.properties.areaDesc}</b></div>
            <div>{alert.properties.description}</div>
            <div>{alert.properties.instruction}</div>
        </div>
    </>
}

export default Alert