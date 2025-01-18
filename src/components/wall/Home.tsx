import profile_icon from '../../assets/icon/profile_icon.png'
import '../../css/components/Home.css'

const Home = () => {
    return (
        <div className="p-5 bg-transparent w-100" id="home-page">
            <div className="dashboard-header d-flex justify-content-between">
                <div>
                    <h1>Hi , User</h1>
                    <p>Welcome back & Lets work together</p>
                </div>
                <img className="profile-img" src={profile_icon} alt=""/>
            </div>
            <div className="d-flex w-100 justify-content-between count-set mt-4">
                <div className="staff-count">
                    <h4>Staff Count</h4>
                    <h1>50</h1>
                </div>
                <div className="vehicle-count">
                    <h4>Vehicle Count</h4>
                    <h1>50</h1>
                </div>
                <div className="field-count">
                    <h4>Field Count</h4>
                    <h1>50</h1>
                </div>
                <div className="equipment-count">
                    <h4>Equipment Count</h4>
                    <h1>50</h1>
                </div>
                <div className="crop-count">
                    <h4>Crop Count</h4>
                    <h1>50</h1>
                </div>
            </div>
            <div className="charts w-100 d-grid">
                {/*Vehicle Pie Chart*/}
                <div className="mt-4">
                    <canvas id="vehicleChart"></canvas>
                </div>

                {/*Equipment Donut Chart*/}
                <div className="mt-4">
                    <canvas id="equipmentChart"></canvas>
                </div>

            </div>
        </div>
    );
}

export default Home;