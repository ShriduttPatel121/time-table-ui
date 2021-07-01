import React, { useState, useEffect, useContext } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, Divider } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import Spinner from '../../shared/components/spinner';

/* const DUMMY_DATA = {
    result: [
        {
            "professor": {
                "_id": "60daf170bbdce06fdc1ede45",
                "name": "Narendra Patel",
                "userName": "Narendra Patel"
            },
            "lectures": [
                {
                    "_id": "60db2868123be979a66f10b8",
                    "professor": "60daf170bbdce06fdc1ede45",
                    "day": 1,
                    "classRoom": {
                        "totalWeekHours": 6,
                        "_id": "60daeaa0c574bb6de58c20c3",
                        "name": "1-A",
                        "__v": 0
                    },
                    "slotNumber": 0,
                    "__v": 0
                },
                {
                    "_id": "60db2a80a103357a19094279",
                    "professor": "60daf170bbdce06fdc1ede45",
                    "day": 1,
                    "classRoom": {
                        "totalWeekHours": 6,
                        "_id": "60daeaa0c574bb6de58c20c3",
                        "name": "1-A",
                        "__v": 0
                    },
                    "slotNumber": 1,
                    "__v": 0
                },
                {
                    "_id": "60dc01bbbf2eaa92e0bc7965",
                    "professor": "60daf170bbdce06fdc1ede45",
                    "day": 1,
                    "classRoom": {
                        "totalWeekHours": 3,
                        "_id": "60daeac1c574bb6de58c20c5",
                        "name": "2-A",
                        "__v": 0
                    },
                    "slotNumber": 2,
                    "__v": 0
                },
                {
                    "_id": "60dd69fe05215adc5b0cbeae",
                    "professor": "60daf170bbdce06fdc1ede45",
                    "day": 1,
                    "classRoom": {
                        "totalWeekHours": 6,
                        "_id": "60daeaa0c574bb6de58c20c3",
                        "name": "1-A",
                        "__v": 0
                    },
                    "slotNumber": 3,
                    "__v": 0
                },
                {
                    "_id": "60dd79f8cdcc783cdc108a33",
                    "professor": "60daf170bbdce06fdc1ede45",
                    "day": 2,
                    "classRoom": {
                        "totalWeekHours": 6,
                        "_id": "60daeaa0c574bb6de58c20c3",
                        "name": "1-A",
                        "__v": 0
                    },
                    "slotNumber": 2,
                    "__v": 0
                },
                {
                    "_id": "60dd6a4905215adc5b0cbec8",
                    "professor": "60daf170bbdce06fdc1ede45",
                    "day": 3,
                    "classRoom": {
                        "totalWeekHours": 3,
                        "_id": "60daeac1c574bb6de58c20c5",
                        "name": "2-A",
                        "__v": 0
                    },
                    "slotNumber": 0,
                    "__v": 0
                }
            ]
        },
        {
            "professor": {
                "_id": "60dcc9a25c5da5d2aa9f1d73",
                "name": "Tom cruze",
                "userName": "Tom cruze"
            },
            "lectures": [
                {
                    "_id": "60dd7d18cdcc783cdc108bef",
                    "professor": "60dcc9a25c5da5d2aa9f1d73",
                    "day": 4,
                    "classRoom": {
                        "totalWeekHours": 6,
                        "_id": "60daeaa0c574bb6de58c20c3",
                        "name": "1-A",
                        "__v": 0
                    },
                    "slotNumber": 1,
                    "__v": 0
                }
            ]
        },
        {
            "professor": {
                "_id": "60dcc9e35c5da5d2aa9f1d76",
                "name": "Tom cruze",
                "userName": "Tom cruze1"
            },
            "lectures": []
        },
        {
            "professor": {
                "_id": "60dd5bac1fce512314e39847",
                "name": "Test Subject",
                "userName": "Professor1"
            },
            "lectures": [
                {
                    "_id": "60dd7a01cdcc783cdc108a38",
                    "professor": "60dd5bac1fce512314e39847",
                    "day": 3,
                    "classRoom": {
                        "totalWeekHours": 3,
                        "_id": "60daeac1c574bb6de58c20c5",
                        "name": "2-A",
                        "__v": 0
                    },
                    "slotNumber": 3,
                    "__v": 0
                },
                {
                    "_id": "60dd7d04cdcc783cdc108be7",
                    "professor": "60dd5bac1fce512314e39847",
                    "day": 4,
                    "classRoom": {
                        "totalWeekHours": 6,
                        "_id": "60daeaa0c574bb6de58c20c3",
                        "name": "1-A",
                        "__v": 0
                    },
                    "slotNumber": 4,
                    "__v": 0
                }
            ]
        }
    ]
} */

const useStyles = makeStyles((theme) => ({
    root: {
      width: '75%',
      margin: 'auto'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },

    listItem: {
        display: "flex",
        justifyContent: "space-between"
    }
  }));

const TotalProfessorsAndSlots =  (props) =>{
    const [profsLectures, setProfsLectures] = useState([]);

    const classes = useStyles();
    const auth = useContext(AuthContext);
    const { sendRequest, isLoading, error } = useHttpClient();

    useEffect(() => {
        const fetchAllProfAndLec = async () => {
            try {
                const resData = await sendRequest("http://localhost:8080/api/admin/fetchAllProWithLectures", "GET", null, { "Content-Type": "application/json", authorization: auth.token });
                setProfsLectures(resData.result)
            } catch (e) {
                alert(error || e.message);
            }
        }
        fetchAllProfAndLec();
    }, []);

    return(
        <div className={classes.root} >
            { isLoading ? <Spinner /> : null }
            {
                profsLectures.map((pl) => {
                    return (
                        <Accordion key={pl.professor._id} style={{width: "70%"}}>
                            <AccordionSummary 
                                expandIcon={<ExpandMoreIcon />}
                                style={{display: "flex", justifyContent: "space-between"}}
                            >
                                <Typography className={classes.heading}>Professor Name: {pl.professor.name}</Typography>
                                <Typography className={classes.heading}>User Name: {pl.professor.userName}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List style={{width: "100%"}}>
                                    <ListItem className={classes.listItem}  >
                                        <Typography variant="body1">Class room</Typography>
                                        <Typography variant="body1">Slot number</Typography>
                                        <Typography variant="body1">Day</Typography>
                                    </ListItem>
                                    <Divider />
                                    {
                                        pl.lectures.length === 0 ? (
                                            <Typography variant="body2">No lectures are assigned</Typography>
                                        ) : (
                                            pl.lectures.map((le, i) =>(
                                            <ListItem className={classes.listItem} divider={(i < pl.lectures.length - 1)} >
                                                <Typography variant="body2">{le.classRoom.name}</Typography>
                                                <Typography variant="body2">{le.slotNumber + 1}</Typography>
                                                <Typography variant="body2">{le.day}</Typography>
                                            </ListItem>
                                        ))
                                        )
                                    }
                                    
                                    {/* {
                                        pl.lectures.map((le, i) =>(
                                            <ListItem className={classes.listItem} divider={(i < pl.lectures.length - 1)} >
                                                <Typography variant="body2">{le.classRoom.name}</Typography>
                                                <Typography variant="body2">{le.slotNumber}</Typography>
                                                <Typography variant="body2">{le.day}</Typography>
                                            </ListItem>
                                        ))
                                    } */}
                                    
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    )
                })
            }
        </div>
    );
};
export default TotalProfessorsAndSlots;
