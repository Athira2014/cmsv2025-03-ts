import { useCallback, useEffect, useState } from "react";
import { Appointment } from "../../models/Appointment";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import apiService from "../../api/apiService";
import ConsultationNotes from "./ConsultationNotes";
import Prescriptions from "./Prescriptions";
import LabTestsPrescribed from "../DoctorsModule/LabTestsPrescribed";
import { ConsultationBilling } from "../../models/ConsultationBilling";

const BillingInfo: React.FC = () => {

    const { appointmentId } = useParams();
    const [billing, setBilling] = useState<ConsultationBilling>()
    const userId = localStorage.getItem("userId");
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const fetchBillingInfo = useCallback(async () => {
        try {
            if (appointmentId !== undefined) {
                setIsLoading(true)
                const response = await apiService.getBillingInfo(Number(appointmentId))
                setBilling(response.data.data)
                setError(null)
            }
        } catch (error) {
            setError("Error occured while fetching appointment")
        }
    }, [])

    useEffect(() => {
        fetchBillingInfo();
    }, [])

    // const handleBackBtn = () => {
    //     navigate(`/appointmentdetails/${userId}/${appointmentId}`)
    // }

    return (
        <div className="container-fluid mt-5">
            <div className="card shadow p-4">
                <div className="card-header p-2 d-flex justify-content-between align-items-center">
                    <h1>Billing Info</h1>
                    {/* <Button className="btn btn-secondary" type="button" onClick={() => handleBackBtn()}>
                        Back
                    </Button> */}
                </div>
                <div className="card-body">
                    <div className="row d-flex ">
                        <div className="col-sm-3">
                            <p><strong>Appointment Id:</strong> {billing?.appointmentId}</p>
                        </div>
                        <div className="col-sm-3">
                            <p><strong>Date :</strong> {billing?.billingDate}</p>
                        </div>
                        <div className="col-sm-3">
                            <p><strong>Payment Status:</strong> {billing?.paymentStatus}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <p><strong>Total Amount :</strong> {billing?.totalAmount}</p>
                        </div>
                        <div className="col-sm-3">
                            <p><strong>Additional cost if Any:</strong> {billing?.additionalCostAny}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <p><strong>Paid Amount:</strong> {billing?.amountPaid}</p>
                        </div>
                        <div className="col-sm-3">
                            <p><strong>Outstanding Amount:</strong> {billing?.outstandingAmt}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillingInfo;