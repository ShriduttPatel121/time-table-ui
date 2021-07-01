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
      margin: 'auto',
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center"
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

const weekDays = [ "Sunday" ,"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
                                style={{display: "flex"}}
                            >
                                <div style={{width: "17rem"}}>
                                <Typography className={classes.heading}>Professor Name: {pl.professor.name}</Typography>
                                </div>
                                { "   " }
                                <div style={{width: "17rem"}}>
                                <Typography style={{marginLeft: "3rem"}} className={classes.heading}>User Name: {pl.professor.userName}</Typography>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List style={{width: "100%"}}>
                                    <ListItem className={classes.listItem}  >
                                        <Typography variant="body1" style={{width: "33%", textAlign: "center"}}>Class room</Typography>
                                        <Typography variant="body1" style={{width: "33%", textAlign: "center"}}>Slot number</Typography>
                                        <Typography variant="body1" style={{width: "33%", textAlign: "center"}}>Day</Typography>
                                    </ListItem>
                                    <Divider />
                                    {
                                        pl.lectures.length === 0 ? (
                                            <Typography variant="body2">No lectures are assigned</Typography>
                                        ) : (
                                            pl.lectures.map((le, i) =>(
                                            <ListItem className={classes.listItem} divider={(i < pl.lectures.length - 1)} >
                                                <Typography variant="body2" style={{width: "33%", textAlign: "center"}}>{le.classRoom.name}</Typography>
                                                <Typography variant="body2" style={{width: "33%", textAlign: "center"}}>{le.slotNumber + 1}</Typography>
                                                <Typography variant="body2" style={{width: "33%", textAlign: "center"}}>{weekDays[le.day]}</Typography>
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
