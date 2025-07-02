// CreateModal.jsx
import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import axios from 'axios';
import {BASE_URL} from '../tools/constante';

const CreateModal = ({show, handleClose, refreshData}) => {
    const [libelle, setLibelle] = useState('');
    const [template, setTemplate] = useState('');

    const handleCreate = () => {
        const newTemplate = {
            libelleConsultation: libelle,
            template: template,
        };

        axios.post(`${BASE_URL}/api/typeconsultations`, newTemplate)
            .then(response => {
                console.log('Template créé avec succès:', response.data);
                handleClose(); // Fermer la modale après la création
                refreshData(); // Rafraîchir les données
            })
            .catch(error => {
                console.error('Erreur lors de la création du template:', error);
            });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Créer un Template</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <label htmlFor="libelle" className="form-label">Libellé</label>
                    <input
                        type="text"
                        id="libelle"
                        className="form-control"
                        value={libelle}
                        onChange={(e) => setLibelle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="template" className="form-label">Contenu du Template</label>
                    <textarea
                        id="template"
                        className="form-control"
                        rows="5"
                        value={template}
                        onChange={(e) => setTemplate(e.target.value)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fermer
                </Button>
                <Button variant="primary" onClick={handleCreate}>
                    Créer
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateModal;
