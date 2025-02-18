function printRecommendations() {
    window.print();
}

function generateRecommendation() {
    let ageValue = document.getElementById("age").value;
    let age = parseInt(ageValue.replace(/\D/g, "")); // Extract numbers from value
    let conditions = [];

    // Ensure checkboxes exist before accessing them
    let conditionIds = ["diabetes", "heart", "lung", "hiv", "cancer", "pregnant", "kidney", "liver", "healthcare"];
    conditionIds.forEach(id => {
        let checkbox = document.getElementById(id);
        if (checkbox && checkbox.checked) {
            conditions.push(id.charAt(0).toUpperCase() + id.slice(1)); // Capitalize first letter
        }
    });

    let vaccines = [];

    // UNIVERSAL VACCINES
    if (document.getElementById("flu") && !document.getElementById("flu").checked) vaccines.push("Annual Influenza Vaccine");
    if (document.getElementById("covid") && !document.getElementById("covid").checked) vaccines.push("COVID-19 Vaccine (Updated Formulation)");

    // AGE-BASED VACCINES
    if (age < 1) vaccines.push("Hepatitis B (Birth dose, then 2-3 more doses)");
    if (age >= 2 && age <= 6) vaccines.push("DTaP, Hib, IPV, PCV, Rotavirus series (Routine childhood schedule)");
    if (age >= 11 && document.getElementById("hpv") && !document.getElementById("hpv").checked) vaccines.push("HPV Vaccine (2-3 doses, up to age 26)");
    if (age >= 13 && age < 19) vaccines.push("Catch-up Vaccinations (HPV, Meningococcal, Tdap if not completed)");
    if (age >= 50 && document.getElementById("shingles") && !document.getElementById("shingles").checked) vaccines.push("Shingles (Shingrix - 2 doses)");
    if (age >= 50) vaccines.push("Pneumococcal (PCV20 or PCV15 + PPSV23)");

    // CONDITION-SPECIFIC RECOMMENDATIONS
    if (conditions.includes("Diabetes") || conditions.includes("Liver")) vaccines.push("Hepatitis B Vaccine (If not previously vaccinated)");
    if (conditions.includes("HIV") || conditions.includes("Cancer")) vaccines.push("Avoid live vaccines (e.g., MMR, Varicella, Yellow Fever)");
    if (conditions.includes("Heart") || conditions.includes("Lung") || age >= 50) vaccines.push("Pneumococcal Vaccine (PCV20 or PCV15 + PPSV23)");
    if (conditions.includes("Kidney")) vaccines.push("Hepatitis B and Pneumococcal Vaccine (High-risk patients)");
    if (conditions.includes("Pregnant")) {
        vaccines.push("Tdap (1 dose each pregnancy)");
        vaccines.push("RSV Vaccine (If eligible during pregnancy)");
        vaccines.push("Influenza (Inactivated, not live vaccine)");
    }
    if (conditions.includes("Healthcare")) vaccines.push("Hepatitis B, MMR, Varicella, Tdap, Influenza (Annual), COVID-19");

    // OTHER RELEVANT VACCINES
    if (document.getElementById("meningococcal") && !document.getElementById("meningococcal").checked) vaccines.push("Meningococcal ACWY and B (For certain high-risk groups)");
    if (document.getElementById("varicella") && !document.getElementById("varicella").checked && age < 50) vaccines.push("Varicella (2 doses if no immunity)");
    if (document.getElementById("tdap") && !document.getElementById("tdap").checked) vaccines.push("Tdap Booster (Every 10 years)");
    if (document.getElementById("rabies") && !document.getElementById("rabies").checked) vaccines.push("Rabies Vaccine (For exposure risk groups)");
    if (document.getElementById("polio") && !document.getElementById("polio").checked) vaccines.push("Polio Vaccine (For certain travelers and outbreak areas)");
    if (document.getElementById("rsv") && !document.getElementById("rsv").checked && age >= 60) vaccines.push("RSV Vaccine (Shared clinical decision-making for 60+)");

    let recommendationData = {
        age: ageValue,
        conditions: conditions,
        vaccines: vaccines
    };

    // Store in localStorage and redirect
    localStorage.setItem("recommendationData", JSON.stringify(recommendationData));
    window.location.href = "recommendations.html";
}
