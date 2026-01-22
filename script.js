function login() {
    if (
        document.getElementById("username").value === "admin" &&
        document.getElementById("password").value === "1234"
    ) {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("mainApp").style.display = "block";
    } else {
        document.getElementById("loginMsg").innerText = "Invalid Login!";
    }
}

function autoDepartment() {
    const map = {
        social: "Social Service Department",
        pension: "Account Department",
        registrar: "Registrar Department",
        nic: "NIC Department",
        land: "Land Department",
        field: "Field Department",
        admin: "Admin Department"
    };

    const purpose = document.getElementById("purpose").value;
    document.getElementById("department").value = map[purpose] || "";
}

document.getElementById("visitorForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let records = JSON.parse(localStorage.getItem("visitors") || "[]");

    records.push({
        name: name.value,
        nic: nic.value,
        phone: phone.value,
        address: address.value,
        gn: gn_division.value,
        purpose: purpose.options[purpose.selectedIndex].text,
        department: department.value,
        date: visit_date.value
    });

    localStorage.setItem("visitors", JSON.stringify(records));
    alert("Saved Successfully");
    this.reset();
});

function downloadCSV() {
    let records = JSON.parse(localStorage.getItem("visitors") || "[]");
    let csv = "Name,NIC,Phone,Address,GN,Purpose,Department,Date\n";

    records.forEach(r => {
        csv += `"${r.name}","${r.nic}","${r.phone}","${r.address}","${r.gn}","${r.purpose}","${r.department}","${r.date}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "visitors.csv";
    a.click();
}
