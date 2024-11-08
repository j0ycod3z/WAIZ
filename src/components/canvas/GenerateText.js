import ModalBot from "./ModalBot";
import * as React from "react";
import Hypothesis from "components/canvas/Hypothesis";
import { CHATBOT } from "settings/Config"; // Ensure that the path is correct
export function toggleModal(setModal) {
    setModal((prevState) => !prevState);
}

// Function to handle text generation based on areaId and textId
export function dumpTextGen(projId, area, hypothesis, area38hypo) {
    let prompt = "";
    //  console.log(`Hypothesis ${hypothesis[0].text} - ${area.id} - ${area.category}`);
    //  console.log(`Hypothesis ${area38hypo}`);
    // hypothesis[0].text = "test"
    //textGeneration(area, hypothesis, area38hypo, area.category);
}
export function textGeneration(areaId, hypothesis, area38hypo, category) {
  
        const payload = {
            job_name : area38hypo,
            job_description: hypothesis,
        };
         console.log(`context: ${area38hypo}`);
        // Using fetch to send a POST request
        fetch("http://192.168.100.51:5000/tech_trend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log("Response from API:", hypothesis[0].text = ["task"]);
                // return data["task"];
                hypothesis[0].text = data["task"];
            })
            .catch((error) => {
                console.log("Error:", error);
            });
}
