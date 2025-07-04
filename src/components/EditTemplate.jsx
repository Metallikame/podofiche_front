import React, { useEffect, useState } from 'react';
import Header from "./Header.jsx";
import { BASE_URL } from "../tools/constante";
import axios from 'axios';
import TemplateBlock from './TemplateBlock.jsx';
import EditModal from './EditModal.jsx';
import { jsPDF } from "jspdf";
import './Chip.css';
import Chip from "./Chip";
import './EditTemplateStyles.css';

const EditTemplate = () => {
    const [typeConsultationListe, setTypeConsultationListe] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [textareaContent, setTextareaContent] = useState('');
    const [selectedTemplates, setSelectedTemplates] = useState({});

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${BASE_URL}/api/typeconsultations`, {
            headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' }
        })
            .then(response => setTypeConsultationListe(response.data))
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
    }, []);

    const handleShowModal = (template) => {
        setSelectedTemplate(template);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTemplate(null);
    };

    const updateTextareaContentOnRemove = (templateContent) => (prevContent) => {
        return prevContent
            .split('\n')
            .filter(line => line.trim() !== templateContent.trim())
            .join('\n')
            .trim();
    };

    const updateTextareaContentOnAdd = (templateContent) => (prevContent) =>
        prevContent ? `${prevContent}\n${templateContent}` : templateContent;

    const handleCheckboxChange = (templateId, templateContent) => {
        setSelectedTemplates(prev => {
            const updatedSelection = { ...prev };
            if (updatedSelection[templateId]) {
                delete updatedSelection[templateId];
                setTextareaContent(updateTextareaContentOnRemove(templateContent));
            } else {
                updatedSelection[templateId] = templateContent;
                setTextareaContent(updateTextareaContentOnAdd(templateContent));
            }
            return updatedSelection;
        });
    };

    const handleChange = (e) => {
        setTextareaContent(e.target.value);
    };

    const refreshData = () => {
        setIsLoading(true);
        axios.get(`${BASE_URL}/api/typeconsultations`, {
            headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' }
        })
            .then(response => setTypeConsultationListe(response.data))
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
    };

    const downloadPDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });
        const leftMargin = 20;
        const rightMargin = 190;
        const contentWidth = rightMargin - leftMargin;
        const lineSpacing = 10;

        doc.setFontSize(10);
        doc.text('Dr. [Nom du Médecin]', leftMargin, 20);
        doc.text('Adresse de la clinique', leftMargin, 25);
        doc.text('Téléphone : 0123456789', leftMargin, 30);
        doc.text('Email : exemple@pied.net', leftMargin, 35);

        const today = new Date().toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        doc.text(`Orvault, le ${today}`, rightMargin, 20, { align: 'right' });

        let currentY = 50;

        doc.setFontSize(12);
        const splitText = doc.splitTextToSize(textareaContent, contentWidth);
        splitText.forEach((line) => {
            doc.text(line, leftMargin, currentY, { align: 'justify' });
            currentY += lineSpacing;
        });

        currentY += 30;
        doc.text('Signature :', leftMargin, currentY);

        doc.save('compte_rendu.pdf');
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-template-page">
            <Header />

            <div className="main-flex-container container-fluid py-5">
                <div className="row flex-lg-row flex-column-reverse justify-content-center align-items-stretch gx-4">
                    {/* Card à gauche : plus de card-modern ici */}
                    <div className="col-lg-4 d-flex align-items-start">
                        {/* On met seulement le TemplateBlock, il gère son encadrement/card */}
                        <TemplateBlock
                            typeConsultationListe={typeConsultationListe}
                            onModify={handleShowModal}
                            refreshData={refreshData}
                        />
                    </div>
                    {/* Zone à droite : chips + textarea format A4 */}
                    <div className="col-lg-8 d-flex flex-column align-items-center mb-5 mb-lg-0">
                        <h5 className="mt-2">Choisissez des Templates à ajouter :</h5>
                        <div className="chips-row d-flex flex-wrap gap-2 mb-3 justify-content-center">
                            {typeConsultationListe.map(template => (
                                <Chip
                                    key={template.typeConsultationId}
                                    label={template.libelleConsultation}
                                    selected={!!selectedTemplates[template.typeConsultationId]}
                                    onClick={() => handleCheckboxChange(template.typeConsultationId, template.template)}
                                />
                            ))}
                        </div>
                        <div className="a4-preview mb-3">
                            <textarea
                                className="cr-textarea"
                                value={textareaContent}
                                onChange={handleChange}
                                rows="3"
                            />
                        </div>
                        <button className="btn btn-primary mb-4" onClick={downloadPDF}>
                            Télécharger en PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal for Editing Template */}
            <EditModal
                show={showModal}
                handleClose={handleCloseModal}
                template={selectedTemplate}
                refreshData={refreshData}
            />
        </div>
    );
};

export default EditTemplate;
