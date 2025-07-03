import React from 'react';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

const PatientBlock = ({patientsList}) => {
    return (
        <div className="col-md-6 mb-4">
            <div className="card bg-dark text-white p-3">
                <h3>Choisir un Patient</h3>
                <select className="form-select mt-3">
                    {patientsList.map((patient) => (
                        <option key={patient.id} value={patient.id}>
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

PatientBlock.propTypes = {
    patientsList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            numeroSecu: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default PatientBlock;
