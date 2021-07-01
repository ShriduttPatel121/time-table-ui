import React, { useState, useEffect, useContext } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, Divider } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import Spinner from '../../shared/components/spinner';


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
