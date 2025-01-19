import { useState } from 'react';
import { Link } from 'react-router-dom';
import dashboard_icon from '../assets/icon/dashboard_icon.svg';
import staff_icon from '../assets/icon/staff_icon.svg';
import vehicle from '../assets/icon/vehicle.svg';
import field_icon from '../assets/icon/field_icon.svg';
import rqu_icon from '../assets/icon/rqu_icon.svg';
import crop_icon from '../assets/icon/crop_icon.svg';
import monitor_log from '../assets/icon/monitor_log.svg';
import log_out from '../assets/icon/log_out.svg';
//import logo from '../assets/logo.png';
import '../css/components/NavigationBar.css';
import vehicleHover from '../assets/icon/hover/vehicle.svg';
import fieldHover from '../assets/icon/hover/field_icon.svg';
import rquHover from '../assets/icon/hover/rqu_icon.svg';
import cropHover from '../assets/icon/hover/crop_icon.svg';
import monitorLogHover from '../assets/icon/hover/monitor_log.svg';
import staffHover from '../assets/icon/hover/staff_icon.svg';
import dashboardHover from '../assets/icon/hover/dashboard_icon.svg';

interface Icon {
    default: string;
    hover: string;
}

const icons: Record<string, Icon> = {
    'dashboard-icon': { default: dashboard_icon, hover: dashboardHover },
    'staff-icon': { default: staff_icon, hover: staffHover },
    vehicle: { default: vehicle, hover: vehicleHover },
    'field-icon': { default: field_icon, hover: fieldHover },
    rqu_icon: { default: rqu_icon, hover: rquHover },
    crop_icon: { default: crop_icon, hover: cropHover },
    monitor_log: { default: monitor_log, hover: monitorLogHover },
};

const navigations: Record<string, string> = {
    'dashboard-icon': 'home',
    'staff-icon': 'staff_management',
    vehicle: 'vehicle_management',
    'field-icon': 'field_management',
    rqu_icon: 'equ_management',
    crop_icon: 'crop_management',
    monitor_log: 'monitor_log',
};

const NavigationBar = () => {
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);
    const [activeButton, setActiveButton] = useState<string>('dashboard-icon');

    const handleMouseEnter = (button: string) => {
        setHoveredButton(button);
    };

    const handleMouseLeave = () => {
        setHoveredButton(null);
    };

    const handleClick = (button: string) => {
        setActiveButton(button);
    };

    return (
        <div className="nav-bar text-center">
            {/*<img className="mt-5" src={logo} alt="logo" />*/}
            <div className="d-flex flex-column align-items-center justify-content-center h-75 gap-5 mt-5">
                {Object.keys(icons).map((key) => (
                    <Link to={`/dashboard/${navigations[key]}`} key={key}>
                        <img
                            className={key}
                            src={
                                activeButton === key || hoveredButton === key
                                    ? icons[key].hover
                                    : icons[key].default
                            }
                            onMouseEnter={() => handleMouseEnter(key)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleClick(key)}
                            alt={`${key.replace('-', ' ')} icon`}
                        />
                    </Link>
                ))}
            </div>
            <div>
                <img
                    className="log-out-btn h-auto"
                    src={log_out}
                    onMouseEnter={() => handleMouseEnter('log-out-btn')}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick('log-out-btn')}
                    alt="log out icon"
                />
            </div>
        </div>
    );
};

export default NavigationBar;
