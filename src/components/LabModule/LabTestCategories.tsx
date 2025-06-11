import React, { useCallback, useEffect, useState } from "react";
import apiService from "../../api/apiService";
import { LabTestCategory } from "../../models/LabTestCategory";
import AddLabTestCategory from "./AddLabTestCategory";

const LabTestCategories = () => {

    // Stores all categories from API
    const [categories, setCategories] = useState<LabTestCategory[]>([])

    //Storing error messages
    const [error, setError] = useState<string | null>(null)

    // Loading state flag
    const [isLoading, setIsLoading] = useState(true)

    // Memorized function to fetch categories from API
    const fetchCategories = async () => {
        try {
            setIsLoading(true)
            const response = await apiService.getLabTestCategories()
            setCategories(response.data.data)
            setError(null)
        } catch (error) {
            setError("Error occured while fetching Test Categories.")
        } finally {
            setIsLoading(false)
        }
    }

    // Effect hook to fetch categories when component mounts
    useEffect(() => {
        fetchCategories();
    }, [])

    // implement edit and disable logic
    function updateOrDisableCategory(category: LabTestCategory): React.MouseEventHandler<HTMLButtonElement> | undefined {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="container-fluid mt-4">
            <div className="card shadow p-4">
                <div className="card header p-3">
                    <AddLabTestCategory />
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Sl.No</th>
                                <th>Category</th>
                                <th>Created Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories?.map((category, index) => (
                                <tr key={category.labTestCatId}>
                                    <td>{index + 1}</td>
                                    <td>{category.category}</td>
                                    <td>{category.createdDate}</td>
                                    <td>{category.isActive}</td>
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

export default LabTestCategories;