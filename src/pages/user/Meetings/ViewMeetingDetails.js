import React, { useState } from "react";

import { styled, Stack, Typography, Box, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { ReactComponent as BackIcon } from "../../../resources/Union.svg";
import TitleBar from "../../../components/TitleBar/TitleBar";
import WrapperBox from "../../../components/WrapperBox";
import InputWithLabel from "../../../components/FormComponents/InputWithLabel";
import MeetingPreview from "../../../components/PreviewCards/MeetingPreview";
import NavChips from "../../../components/NavChips/NavChips";
import MeetingLinkPreview from "../../../components/PreviewCards/MeetingLinkPreview";

const meetingDetailInputs = [
    { name: "name", label: "Full Name", helperText: "Full Name" },
    { name: "email", label: "Email", helperText: "Email Address" },
    { name: "phone", label: "Phone", helperText: "Phone Number" },
    {
        name: "company",
        label: "Company Name (optional)",
        helperText: "Company Name",
    },
    {
        name: "reason",
        label: "What is the reason for the appointment ?",
        helperText: "Explain your requirements / problem",
        inputProps: {
            multiline: true,
            minRows: 3,
        },
    },
];

const getInitialState = () => {
    let initialState = {};
    meetingDetailInputs.forEach((inputDetail) => {
        initialState = {
            ...initialState,
            [inputDetail.name]: "",
        };
    });
    return initialState;
};

const PreviewStack = styled((props) => <Stack spacing={1} {...props} />)({
    marginTop: "2vh",
    marginBottom: "2vh",
});

const SubHeadingBox = styled((props) => <Box {...props} />)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "-10px !important",
});

const ViewMeetingDetails = () => {
    const { meetingId } = useParams();
    const [disabled, setDisabled] = useState(true);
    const [meetingDetails, setMeetingDetails] = useState(getInitialState);

    const editChangeHandler = () => {
        setDisabled((prevState) => !prevState);
    };

    const detailChangeHandler = (detailName, newValue) => {
        setMeetingDetails((prevState) => ({
            ...prevState,
            [detailName]: newValue,
        }));
    };

    // useLayoutEffect to get the meetingDetails using meetingID

    return (
        <WrapperBox>
            <TitleBar Title="Meeting Details" startIcon={<BackIcon />} />
            <NavChips type="meeting" />
            <PreviewStack>
                <MeetingPreview
                // lawyerImage={lawyerImage}
                // lawyerName={lawyerName}
                // date={date}
                // time={time}
                // cost={cost}
                />
                <MeetingLinkPreview
                // image={meetingImage}
                // meetingLink={meetingLink}
                />
            </PreviewStack>
            <Stack spacing={4}>
                <SubHeadingBox>
                    <Typography variant="h6">My Details</Typography>
                    <IconButton onClick={editChangeHandler}>
                        <FiEdit />
                    </IconButton>
                </SubHeadingBox>
                {meetingDetailInputs.map((inputDetail) => (
                    <InputWithLabel
                        key={inputDetail.name}
                        name={inputDetail.name}
                        label={inputDetail.label}
                        value={meetingDetails[inputDetail.name]}
                        onChange={detailChangeHandler}
                        helperText={inputDetail.helperText}
                        inputProps={{
                            ...inputDetail.inputProps,
                            disabled: disabled,
                        }}
                    />
                ))}
            </Stack>
        </WrapperBox>
    );
};

export default ViewMeetingDetails;
