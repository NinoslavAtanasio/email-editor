import axios from "./axios";
class ExportHtmlService {
    generateHtml = jsx =>
        new Promise((resolve, reject) => {
            const url = "https://editor-server.ravenapp.dev/api/html";
            axios
                .post(url, { app: jsx }, { headers: { "Content-Type": "application/json" } })
                .then(response => {
                    if (response) {
                        resolve(response.data);
                    } else {
                        reject(response);
                    }
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
}

const exportHtmlService = new ExportHtmlService();

export default exportHtmlService;
