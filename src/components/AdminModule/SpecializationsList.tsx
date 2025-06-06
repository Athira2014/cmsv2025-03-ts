import React, { useCallback, useEffect, useState } from "react";
import { Specialization } from "../../models/Specialization";
import axios from "axios";
import AddSpecialization from "./AddSpecialization";
import apiService from "../../api/apiService";

const SpecializationsList: React.FC = () => {


    const [specializations, setSpecializations] = useState<Specialization[]>([])

    const [error, setError] = useState<string | null>(null)

    const [isLoading, setIsLoading] = useState(true)

    const fetchSpecializations = useCallback(async () => {

        try {
            setIsLoading(true)
            const response = await apiService.specializations()
            setSpecializations(response.data.data)
            setError(null)
        } catch (error) {
            setError("Error occure while fetching Specializations.")
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchSpecializations();
    }, [])

    return (
        <div className="container-fluid">
            <div className="card shadow p-4">
                <div className="card header">
                    <AddSpecialization/>
                </div>
                <div className="table-responsive">
                     <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Sl.No</th>
                                <th>Specialization</th>
                            </tr>
                        </thead>
                        <tbody>
                            {specializations.map((specialization, index) => (
                                <tr key={specialization.specializationId}>
                                    <td>{index+1}</td>
                                    <td>{specialization.specializationName}</td>
                                </tr>
                            ))}
                        </tbody>
                     </table>
                </div>
            </div>
        </div>
    )
}

export default SpecializationsList;