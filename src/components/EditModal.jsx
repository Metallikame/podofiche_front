import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../tools/constante';

const EditModal = ({ show, handleClose, template, refreshData }) => {
    const [modifiedTemplate, setModifiedTemplate] = useState('');

    // Mettre à jour le state quand le template change
    useEffect(() => {
        if (template) {
            setModifiedTemplate(template.template);
        }
    }, [template]);

    // Gère la modification du textarea
    const handleChange = (e) => {
        setModifiedTemplate(e.target.value);
    };

    // Gère la sauvegarde des modifications
    const handleSave = () => {
        if (template) {
            // Requête PUT ou PATCH pour mettre à jour le template dans la BDD
            axios.put(`${BASE_URL}/api/typeconsultations/${template.typeConsultationId}`, {
                ...template,
                template: modifiedTemplate, // Met à jour seulement le champ template
            })
                .then(response => {
                    console.log('Template mis à jour avec succès:', response.data);
                    handleClose(); // Fermer la modale après la sauvegarde
                    refreshData();  // Actualiser les données après la sauvegarde
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
                {/* Affiche le textarea seulement si un template est sélectionné */}
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
                    onClick={handleSave}  // Appelle la fonction pour sauvegarder
                >
                    Enregistrer les modifications
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditModal;
