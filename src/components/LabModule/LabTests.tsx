import React, { useCallback, useEffect, useState } from "react";
import apiService from "../../api/apiService";
import { LabTest } from "../../models/LabTest";
import AddLabTest from "./AddLabTest";
import { Link } from "react-router-dom";

const LabTests = () => {

    // Stores all categories from API
    const [tests, setTests] = useState<LabTest[]>([])

    //Storing error messages
    const [error, setError] = useState<string | null>(null)

    // Loading state flag
    const [isLoading, setIsLoading] = useState(true)

    // Memorized function to fetch tests from API
    const fetchTests = async () => {
        try {
            setIsLoading(true)
            const response = await apiService.getLabTests()
            setTests(response.data.data)
            setError(null)
        } catch (error) {
            setError("Error occured while fetching Tests.")
        } finally {
            setIsLoading(false)
        }
    }

    // Effect hook to fetch categories when component mounts
    useEffect(() => {
        fetchTests();
    }, [])

    // implement edit and disable logic
    function updateOrDisableTests(category: LabTest): React.ChangeEvent<HTMLButtonElement> {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="container-fluid mt-4">
            <div className="card shadow p-4">
                {/* <div className="card-header">
                    <Link to={`/laboratory`} className="btn btn-secondary">
                        <i className="fas fa-arrow-right"></i> Back
                    </Link>
                </div> */}

                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Sl.No</th>
                                <th>Test</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Parameters</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tests?.map((test, index) => (
                                <tr key={test.labTestsId}>
                                    <td>{index + 1}</td>
                                    <td>{test.testName}</td>
                                    <td>{test?.labTestCategory?.category}</td>
                                    <td>{test.description}</td>
                                    <td>{test.parameters}</td>
                                    <td>
                                        {/* <Button variant="secondary" type="submit" onClick={updateOrDisableCategory(category)}>Edit</Button>
                                        <Button variant="secondary" type="submit" onClick={updateOrDisableCategory(category)}>Disable</Button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default LabTests;