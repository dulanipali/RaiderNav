import React, { useState } from "react";
import { Box, Typography, TextField, Paper, Link } from "@mui/material";
import Layout from "./layout";

const studentSupportData = {
    "studentSupport": {
        "preventionAndResponse": {
            "title": "Prevention and Response",
            "services": [
                {
                    "name": "Raider Ride",
                    "phone": "(806) 742-7433",
                    "location": "Administrative Support Center, Room 145",
                    "website": "https://www.depts.ttu.edu/parking/InformationFor/MobilitySolutions/RaiderRide.php"
                },
                {
                    "name": "Raider Red's Food Pantry",
                    "phone": "(806) 742-2984",
                    "location": "Doak Hall, Room 117",
                    "website": "https://www.depts.ttu.edu/raiderrelief/foodpantry.php"
                },
                {
                    "name": "Student Legal Services",
                    "phone": "(806) 742-3289",
                    "location": "SUB, Room 307",
                    "website": "https://www.depts.ttu.edu/sls/"
                },
                {
                    "name": "Raider Relief – Advocacy and Resource Center",
                    "phone": "(806) 742-5175",
                    "location": "Drane Hall, Room 104",
                    "website": "https://www.depts.ttu.edu/raiderrelief/"
                },
                {
                    "name": "Risk Intervention & Safety Education",
                    "phone": "(806) 742-2110",
                    "location": "Drane Hall, Room 247",
                    "website": "https://www.depts.ttu.edu/rise/"
                }
            ]
        },
        "wellnessSupport": {
            "title": "Wellness Support",
            "services": [
                {
                    "name": "Student Health Services",
                    "phone": "(806) 743-2848",
                    "location": "Student Wellness Center, 1003 Flint Ave",
                    "website": "https://www.depts.ttu.edu/studenthealth/"
                },
                {
                    "name": "Student Counseling Center",
                    "phone": "(806) 742-3674",
                    "location": "Student Wellness Center, Room 201",
                    "website": "https://www.depts.ttu.edu/scc/"
                },
                {
                    "name": "Student Mental Health Community",
                    "phone": "(806) 834-4544",
                    "location": "Weeks Hall, Room 244",
                    "website": "https://www.depts.ttu.edu/hs/student_mental_health_community/index.php"
                },
                {
                    "name": "Office of the Dean of Students",
                    "phone": "(806) 742-2984",
                    "location": "SUB, Room 201AA",
                    "website": "https://www.depts.ttu.edu/dos/"
                },
                {
                    "name": "Student Disability Services",
                    "phone": "(806) 742-2405",
                    "location": "Weeks Hall, Room 130",
                    "website": "https://www.depts.ttu.edu/sds/"
                },
                {
                    "name": "First Generation Transition & Mentoring Programs",
                    "phone": "(806) 742-7060",
                    "location": "Doak Hall, Room 119C",
                    "website": "https://www.depts.ttu.edu/coe/undergraduate/cpceed/FYSTE.php"
                },
                {
                    "name": "University Recreation",
                    "phone": "(806) 742-3351",
                    "location": "3219 Main St",
                    "website": "https://www.depts.ttu.edu/urec/"
                },
                {
                    "name": "Red to Black Peer Financial Coaching",
                    "phone": "(806) 742-9781",
                    "location": "Drane Hall, Room 215",
                    "website": "https://www.depts.ttu.edu/r2b/"
                },
                {
                    "name": "Campus Access & Engagement",
                    "phone": "(806) 742-7025",
                    "location": "Email campusaccessandengagement@ttu.edu",
                    "website": "https://www.depts.ttu.edu/access-engagement/"
                }
            ]
        },
        "academicSupport": {
            "title": "Academic Support",
            "services": [
                {
                    "name": "The Learning Center",
                    "phone": "(806) 742-3664",
                    "location": "Drane Hall, Room 164",
                    "website": "https://www.depts.ttu.edu/provost/aiss/learning-center/"
                },
                {
                    "name": "Supplemental Instruction",
                    "phone": "(806) 742-3664",
                    "location": "Drane Hall, Room 135",
                    "website": "https://www.depts.ttu.edu/provost/aiss/supplemental-instruction/"
                },
                {
                    "name": "University Writing Center",
                    "phone": "(806) 742-2476",
                    "location": "Weeks Hall, 3rd Floor",
                    "website": "https://www.depts.ttu.edu/provost/uwc/"
                },
                {
                    "name": "University Career Center",
                    "phone": "(806) 742-2210",
                    "location": "Career Center, Wiggins Complex",
                    "website": "https://www.depts.ttu.edu/careercenter/"
                },
                {
                    "name": "Student Business Services",
                    "phone": "(806) 742-3272",
                    "location": "West Hall, Room 301",
                    "website": "https://www.depts.ttu.edu/studentbusinessservices/"
                }
            ]
        }
    }
};

const Services = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const allServices = [
        ...studentSupportData.studentSupport.preventionAndResponse.services,
        ...studentSupportData.studentSupport.wellnessSupport.services,
        ...studentSupportData.studentSupport.academicSupport.services,
    ];

    const filteredServices = allServices.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <Box
                width="100vw"
                height="auto"
                bgcolor="#f5f3f4"
                padding={2}
                maxWidth="100vw"
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <Typography
                    variant="h6"
                    fontFamily="Roboto, Helvetica"
                    fontWeight="normal"
                    color="black"
                    mb={2}
                >
                    Popular Campus Services
                </Typography>
                <TextField
                    variant="outlined"
                    placeholder="Search Services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ mb: 2, width: '90%' }}
                />
                <Box width="90vw" marginBottom={2}>
                    {filteredServices.map((service) => (
                        <Link href={service.website} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>

                            <Paper
                                key={service.name}
                                elevation={3}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: 16,
                                    padding: 16,
                                    backgroundColor: "white",
                                }}
                                sx={{
                                    "&:hover": {
                                        elevation: 6,
                                        transform: "scale(1.01)",
                                    },
                                }}
                            >
                                <Box flex={1}>
                                    <Typography variant="h6" color="#660708">
                                        {service.name}
                                    </Typography>
                                    <Typography variant="body1" color="black">
                                        Phone: {service.phone}
                                    </Typography>
                                    <Typography variant="body1" color="black">
                                        Location: {service.location}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Link>
                    ))}
                </Box>
            </Box>
        </Layout>
    )
}

export default Services;