import classnames from 'classnames';
import styles from 'styles/alerts.module.css';
import { NWSFeature } from "types/Weather";

interface AlertProps {
    alert: NWSFeature
}

const Alert = ({alert}: AlertProps): JSX.Element => {
    if (!alert) return <></>

    const {properties} = alert // get alert properties for easier access
    
    return <>
        <div className={classnames(styles.alertContainer, styles[`${properties.severity}-border`])}>
            <div style={{}}><b>{properties.areaDesc}</b></div>
            <div>{properties.description}</div>
            <div>{properties.instruction}</div>
        </div>
    </>
}

export default Alert