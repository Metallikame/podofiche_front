import React from 'react';
import {Button} from 'react-bootstrap';

const PatientBlock = ({patientsList}) => {
    return (
        <div className="col-md-6 mb-4">
            <div className="card bg-dark text-white p-3">
                <h3>Choisir un Patient</h3>
                <select className="form-select mt-3">
                    {patientsList.map((patient, index) => (
                        <option key={index} value={patient.id}>
                            {patient.numeroSecu}
                        </option>
                    ))}
                </select>
                <Button
                    className="btn btn-success mt-3 w-100"
                    onClick={() => window.location.href = '/generate'}>
                    Générer
                </Button>
            </div>
        </div>
    );
};

export default PatientBlock;
