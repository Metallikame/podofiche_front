import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import axios from 'axios';
import {BASE_URL} from '../tools/constante';

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
        <div className="col-md-6 mb-4">
            <div className="card bg-dark text-white p-3">
                <h3>Editeur de templates</h3>

                {/* Sélecteur pour modifier un template */}
                <div className="mt-4">
                    <h5>Modifier un Template existant</h5>
                    <select onChange={(e) => setSelectedTemplateId(e.target.value)} className="form-select mt-3">
                        <option value="">Sélectionnez un Template à modifier</option>
                        {typeConsultationListe.map((item, index) => (
                            <option key={index} value={item.typeConsultationId}>
                                {item.libelleConsultation}
                            </option>
                        ))}
                    </select>
                    <button className="btn btn-primary mt-3 w-100" onClick={handleModifyClick}>
                        Modifier
                    </button>
                </div>

                {/* Bouton pour créer un nouveau template */}
                <div className="mt-4">
                    <h5>Créer un Nouveau Template</h5>
                    <button className="btn btn-success mt-3 w-100" onClick={handleOpenCreateModal}>
                        Créer
                    </button>
                </div>

                {/* Sélecteur pour supprimer un template */}
                <div className="mt-4">
                    <h5>Supprimer un Template</h5>
                    <select
                        className="form-select mt-2"
                        value={deleteTemplateId}
                        onChange={(e) => setDeleteTemplateId(e.target.value)}
                    >
                        <option value="">Sélectionnez un Template à supprimer</option>
                        {typeConsultationListe.map((item, index) => (
                            <option key={index} value={item.typeConsultationId}>
                                {item.libelleConsultation}
                            </option>
                        ))}
                    </select>
                    <button
                        className="btn btn-danger mt-3 w-100"
                        onClick={handleOpenDeleteModal}
                        disabled={!deleteTemplateId} // Désactive si rien n'est sélectionné
                    >
                        Supprimer
                    </button>
                </div>
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

export default TemplateBlock;
