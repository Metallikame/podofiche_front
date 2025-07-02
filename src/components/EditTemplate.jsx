import React, { useEffect, useState } from 'react';
import Header from "./Header.jsx";
import { BASE_URL } from "../tools/constante";
import axios from 'axios';
import TemplateBlock from './TemplateBlock.jsx';
// import PatientBlock from './PatientBlock.jsx';
import EditModal from './EditModal.jsx';
import { jsPDF } from "jspdf";

const EditTemplate = () => {
    const [typeConsultationListe, setTypeConsultationListe] = useState([]);
    // const [patientsList, setPatientsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [textareaContent, setTextareaContent] = useState('');
    const [selectedTemplates, setSelectedTemplates] = useState({});

    useEffect(() => {
        setIsLoading(true);
        // Fetch type consultations
        axios.get(`${BASE_URL}/api/typeconsultations`, {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        })
            .then(response => {
                setTypeConsultationListe(response.data);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => setIsLoading(false));

        // Fetch patients list
        // axios.get(`${BASE_URL}/api/patients`, {
        //     headers: {
        //         'Access-Control-Allow-Origin': 'http://localhost:3000'
        //     }
        // })
        //     .then(response => {
        //         setPatientsList(response.data);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
        //     .finally(() => setIsLoading(false));
    }, []);

    const handleShowModal = (template) => {
        setSelectedTemplate(template);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTemplate(null);
    };

    const refreshData = () => {
        setIsLoading(true);
        axios.get(`${BASE_URL}/api/typeconsultations`, {
            headers: {'Access-Control-Allow-Origin': 'http://localhost:3000'}
        })
            .then(response => setTypeConsultationListe(response.data))
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
    };

    const handleChange = (e) => {
        setTextareaContent(e.target.value);
    };

    const handleCheckboxChange = (templateId, templateContent) => {
        setSelectedTemplates(prev => {
            const updatedSelection = {...prev};
            if (updatedSelection[templateId]) {
                delete updatedSelection[templateId];
                // Remove the templateContent from textarea and trim it
                setTextareaContent(prevContent => {
                    const newContent = prevContent
                        .split('\n')
                        .filter(line => line.trim() !== templateContent.trim())
                        .join('\n')
                        .trim();
                    return newContent;
                });
            } else {
                updatedSelection[templateId] = templateContent;
                setTextareaContent(prevContent => prevContent ? `${prevContent}\n${templateContent}` : templateContent);
            }
            return updatedSelection;
        });
    };

    const downloadPDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        // Set up margins and document structure
        const leftMargin = 20;
        const rightMargin = 190;
        const contentWidth = rightMargin - leftMargin;
        const lineSpacing = 10;

        // Header: Contact Info (Top Left)
        doc.setFontSize(10);
        doc.text('Dr. [Nom du Médecin]', leftMargin, 20);
        doc.text('Adresse de la clinique', leftMargin, 25);
        doc.text('Téléphone : 0123456789', leftMargin, 30);
        doc.text('Email : exemple@pied.net', leftMargin, 35);

        // Header: Date and Location (Top Right)
        const today = new Date().toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        doc.text(`Orvault, le ${today}`, rightMargin, 20, { align: 'right' });

        // Add a line break after header
        let currentY = 50;

        // Content: Add the textarea content in justified format
        doc.setFontSize(12);
        const splitText = doc.splitTextToSize(textareaContent, contentWidth); // Automatically split text into lines
        splitText.forEach((line, index) => {
            doc.text(line, leftMargin, currentY, { align: 'justify' });
            currentY += lineSpacing;
        });

        // Footer: Space for signature
        currentY += 30; // Add some space before the signature
        doc.text('Signature :', leftMargin, currentY);

        // Save the document with a suitable name
        doc.save('compte_rendu.pdf');
    };


    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-template-page">
            <Header />
            <div className="container mt-4">
                <h1 className="text-center text-white">Éditer un Template</h1>
                <div className="row mt-5 justify-content-between">
                    {/* Template Block */}
                    <TemplateBlock
                        typeConsultationListe={typeConsultationListe}
                        onModify={handleShowModal}
                        refreshData={refreshData}
                    />
                    {/* Patient Block */}
                    {/*<PatientBlock*/}
                    {/*    patientsList={patientsList}*/}
                    {/*/>*/}
                </div>

                <h5 className="mt-4">Choisissez des Templates à ajouter :</h5>
                {typeConsultationListe.map(template => (
                    <div key={template.typeConsultationId} className="form-check">
                        <input
                            type="checkbox"
                            checked={!!selectedTemplates[template.typeConsultationId]}
                            onChange={() => handleCheckboxChange(template.typeConsultationId, template.template)}
                            className="form-check-input"
                        />
                        <label className="form-check-label">{template.libelleConsultation}</label>
                    </div>
                ))}
                <textarea
                    className="form-control mt-4"
                    value={textareaContent}
                    onChange={handleChange}
                    rows="10"
                />
                <button className="btn btn-primary mt-3 mb-3" onClick={downloadPDF}>
                    Télécharger en PDF
                </button>
            </div>

            {/* Modal for Editing Template */}
            <EditModal
                show={showModal}
                handleClose={handleCloseModal}
                template={selectedTemplate}
                refreshData={refreshData}  // Passer la fonction de rafraîchissement
            />
        </div>
    );
};

export default EditTemplate;
