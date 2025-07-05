import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Modal} from "react-bootstrap";
import {BASE_URL} from '../tools/constante';
import axios from "axios";
import './TemplateBlock.css';

const TemplateBlock = ({typeConsultationListe, onModify, refreshData}) => {
    const [selectedTemplateId, setSelectedTemplateId] = useState(''); // ID pour modification
    const [showCreateModal, setShowCreateModal] = useState(false); // Modale création
    const [newTemplateLibelle, setNewTemplateLibelle] = useState(''); // Nouveau libellé
    const [newTemplateContent, setNewTemplateContent] = useState(''); // Nouveau contenu
    const [deleteTemplateId, setDeleteTemplateId] = useState(''); // ID pour suppression
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Modale suppression

    // Gérer la sélection du template pour modification
    const handleModifyClick = () => {
        const selectedTemplate = typeConsultationListe.find(item =>
            item.typeConsultationId.toString() === selectedTemplateId
        );

        if (selectedTemplate) {
            onModify(selectedTemplate);
        }
    };

    // Gérer l'ouverture de la modale de création
    const handleOpenCreateModal = () => {
        setShowCreateModal(true);
    };

    // Gérer la création d'un nouveau template
    const handleCreateTemplate = () => {
        if (newTemplateLibelle.trim() === '' || newTemplateContent.trim() === '') {
            return; // Empêche la création si le libellé ou le contenu est vide
        }

        axios.post(`${BASE_URL}/api/typeconsultations`, {
            libelleConsultation: newTemplateLibelle,
            template: newTemplateContent // Ajoute le contenu du template
        })
            .then(response => {
                console.log('Nouveau template créé avec succès:', response.data);
                setNewTemplateLibelle(''); // Réinitialise le champ
                setNewTemplateContent(''); // Réinitialise le champ
                setShowCreateModal(false); // Ferme la modale
                refreshData(); // Rafraîchir la liste après la création
            })
            .catch(error => {
                console.error('Erreur lors de la création du template:', error);
            });
    };

    // Gérer l'ouverture de la modale de suppression
    const handleOpenDeleteModal = () => {
        if (deleteTemplateId) {
            setShowDeleteModal(true);
        }
    };

    // Gérer la suppression du template
    const handleDeleteTemplate = () => {
        if (deleteTemplateId) {
            axios.delete(`${BASE_URL}/api/typeconsultations/${deleteTemplateId}`)
                .then(response => {
                    console.log('Template supprimé avec succès:', response.data);
                    setShowDeleteModal(false); // Ferme la modale
                    setDeleteTemplateId(''); // Réinitialise la sélection
                    refreshData(); // Rafraîchir la liste après suppression
                })
                .catch(error => {
                    console.error('Erreur lors de la suppression du template:', error);
                });
        }
    };

    return (
        <div className="card-modern">
            <h2>Éditeur de templates</h2>

            {/* Modification */}
            <div className="mb-4">
                <div className="mb-2 fw-semibold text-secondary">Modifier un Template existant</div>
                <select
                    onChange={(e) => setSelectedTemplateId(e.target.value)}
                    className="form-select mb-3"
                    value={selectedTemplateId}
                >
                    <option value="">Sélectionnez un Template à modifier</option>
                    {typeConsultationListe.map((item) => (
                        <option key={item.typeConsultationId} value={item.typeConsultationId}>
                            {item.libelleConsultation}
                        </option>
                    ))}
                </select>
                <button className="btn btn-primary w-100 mb-3 btn-lg" onClick={handleModifyClick}>
                    Modifier
                </button>
            </div>

            {/* Création */}
            <div className="mb-4">
                <div className="mb-2 fw-semibold text-secondary">Créer un Nouveau Template</div>
                <button className="btn btn-success w-100 btn-lg" onClick={handleOpenCreateModal}>
                    Créer
                </button>
            </div>

            {/* Suppression */}
            <div className="mb-4">
                <div className="mb-2 fw-semibold text-secondary">Supprimer un Template</div>
                <select
                    className="form-select mb-3"
                    value={deleteTemplateId}
                    onChange={(e) => setDeleteTemplateId(e.target.value)}
                >
                    <option value="">Sélectionnez un Template à supprimer</option>
                    {typeConsultationListe.map((item) => (
                        <option key={item.typeConsultationId} value={item.typeConsultationId}>
                            {item.libelleConsultation}
                        </option>
                    ))}
                </select>
                <button
                    className="btn btn-danger w-100 btn-lg"
                    onClick={handleOpenDeleteModal}
                    disabled={!deleteTemplateId}
                >
                    Supprimer
                </button>
            </div>

            {/* Modale de création de template */}
            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Créer un Nouveau Template</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label htmlFor="templateLibelle">Libellé :</label>
                        <input
                            id="templateLibelle"
                            type="text"
                            className="form-control mt-2"
                            value={newTemplateLibelle}
                            onChange={(e) => setNewTemplateLibelle(e.target.value)}
                        />
                        <label htmlFor="templateContent" className="mt-3">Contenu :</label>
                        <textarea
                            id="templateContent"
                            className="form-control mt-2"
                            value={newTemplateContent}
                            onChange={(e) => setNewTemplateContent(e.target.value)}
                            rows="4"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                        Annuler
                    </Button>
                    <Button variant="success" onClick={handleCreateTemplate}>
                        Créer
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modale de confirmation pour suppression */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Êtes-vous sûr de vouloir supprimer ce template ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Annuler
                    </Button>
                    <Button variant="danger" onClick={handleDeleteTemplate}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

TemplateBlock.propTypes = {
    typeConsultationListe: PropTypes.arrayOf(
        PropTypes.shape({
            typeConsultationId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            libelleConsultation: PropTypes.string.isRequired,
        })
    ).isRequired,
    onModify: PropTypes.func.isRequired,
    refreshData: PropTypes.func.isRequired,
};

export default TemplateBlock;
