import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../tools/constante';
import PropTypes from 'prop-types';

const EditModal = ({ show, handleClose, template, refreshData }) => {
    const [modifiedTemplate, setModifiedTemplate] = useState('');

    useEffect(() => {
        if (template) {
            setModifiedTemplate(template.template);
        }
    }, [template]);

    const handleChange = (e) => {
        setModifiedTemplate(e.target.value);
    };

    const handleSave = () => {
        if (template) {
            axios.put(`${BASE_URL}/api/typeconsultations/${template.typeConsultationId}`, {
                ...template,
                template: modifiedTemplate,
            })
                .then(response => {
                    console.log('Template mis à jour avec succès:', response.data);
                    handleClose();
                    refreshData();
                })
                .catch(error => {
                    console.error('Erreur lors de la mise à jour du template:', error);
                });
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modifier le Template</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {template ? (
                    <div>
                        <label htmlFor="templateTextArea">Contenu du Template :</label>
                        <textarea
                            id="templateTextArea"
                            className="form-control"
                            value={modifiedTemplate}
                            onChange={handleChange}
                            rows="5"
                        />
                    </div>
                ) : (
                    <p>Sélectionnez un template pour le modifier.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fermer
                </Button>
                <Button
                    variant="primary"
                    disabled={!template}
                    onClick={handleSave}
                >
                    Enregistrer les modifications
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

EditModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    refreshData: PropTypes.func.isRequired,
    template: PropTypes.shape({
        template: PropTypes.string,
        typeConsultationId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        // Ajoute d'autres champs si besoin !
    }),
};

export default EditModal;
