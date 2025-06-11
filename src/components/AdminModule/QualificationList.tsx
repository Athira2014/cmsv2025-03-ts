import React, { EventHandler, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiService from "../../api/apiService";
import { Qualification } from "../../models/Qualification";
import AddQualification from "./AddQualification";
import { Button } from "react-bootstrap";

const QualificationList: React.FC = () => {

    // state to store all qualification from api
    const [qualifications, setQualifications] = useState<Qualification[]>([])

    // state to hold error
    const [error, setError] = useState<string | null>(null)

    //isLoading flag
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate();
    const location = useLocation();


    // Memorized function to fetch qualifications from API
    const fetchQualifications = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await apiService.qualifications()
            console.log(response)

            setQualifications(response.data);
            setError(null); // Clear any previous error
        } catch (error) {
            setError("Error occurred while qualification permissions.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Effect hook to fetch employees when component mounts
    // useEffect is the first method executed when a componet is loaded
    useEffect(() => {
        if (location.state?.shouldRefresh) {
            fetchQualifications();
        }
    }, [location.state])

    // const updateQualification = (qualification: Qualification) =>{
    //        navigate(`/editQualification/${qualification.qId}`);
    // }

    //Component rendering
    return (
        <div className="container-fluid mt-5">
            <div className="card shadow p-4">
                <div className="card header p-3">
                    <div className="card-header">
                        <h3> Qualifications List</h3>
                    </div>
                    <AddQualification />
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Sl.No</th>
                                <th>Qualification</th>
                                <th>Status</th>
                                {/* <th>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {qualifications?.map((qualification, index) => (
                                <tr key={qualification.qId}>
                                    {/* serial number starts from 1 */}
                                    <td>{index + 1}</td>
                                    <td>{qualification.qualification}</td>
                                    <td>{qualification.active ? 'Active' : 'Inactive'}</td>
                                    {/* <td>
                                    <Button variant ="secondary" type="submit" onClick={() => updateQualification(qualification)}>Edit</Button>
                                </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default QualificationList;