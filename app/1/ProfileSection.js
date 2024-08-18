import { TextField, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { ProfileStyles } from "./ProfileStyles";

const ProfileSection = ({ title = "Profile Section", multiline = false, value, handleChange, width: width }) => {

  return <Stack sx={ProfileStyles.profileSectionStyles}>
    <TextField
      id={title}
      label={title.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()}
      variant="outlined"
      sx={ProfileStyles.profileInputStyles}
      multiline={multiline}
      rows={multiline ? 4 : undefined}
      value={value}
      onChange={(event) => handleChange(event)}
      name={`profile${title}`}
      autoComplete="off"
    />
  </Stack>
};

export default ProfileSection;
