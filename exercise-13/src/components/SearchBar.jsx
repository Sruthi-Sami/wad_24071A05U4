import React from 'react'
import { useForm } from 'react-hook-form'

function SearchBar({ onSearch }) {
    let { register, handleSubmit } = useForm();

    const onFormSubmit = ({ city }) => {
        onSearch(city);
    }
    return (
        <div className="container mt-4 mb-4">
            <form
                className="row justify-content-center g-2"
                onSubmit={handleSubmit(onFormSubmit)}
            >
                <div className="col-12 col-md-6">
                    <input
                        type="text"
                        placeholder="Enter city name"
                        {...register("city")}
                        className="form-control"
                    />
                </div>

                <div className="col-auto">
                    <button type="submit" className="btn btn-success px-4">
                        Search
                    </button>
                </div>
            </form>
        </div>

    )
}

export default SearchBar