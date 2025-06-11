import { Link, Outlet, useParams } from 'react-router-dom';
import '../../styles/DashboardUnits.css';

const LabDashBoard: React.FC = () => {

    const userId = localStorage.getItem("userId");

    return (
        <div className='container-dashboard-unit'>
            <aside className='sidebar'>
                <h2>Laboratory Panel</h2>
                <ul>
                    <li><Link to={`/laboratory/labTestCategories`}>Test Categories</Link></li>
                    <li><Link to={`/laboratory/addLabTest`} >Add new Test</Link></li>
                    <li><Link to={'/laboratory/testList'} >Test List</Link></li>
                    <li><Link to={`/laboratory/addTestResult`}>Add Test Results</Link></li>
                    <li><Link to='/laboratory/testResults' >Test Result</Link></li>

                </ul>
            </aside>

            <main className="dashboard-content">
                {/* Renders the child component in a nested Route */}
                <Outlet/>
            </main>
        </div>
    )
}

export default LabDashBoard; 