

const pageHeaderStyles = {
  fontSize: "30px",
  fontWeight: "300",
  m: 0,
  p: 0,
  pl: 1,
  color: "#FFFFFF",
  background: "linear-gradient(180deg, rgba(97, 97, 97, 0.4) 99.99%, rgba(97, 97, 97, 0) 100%)",
  borderBottom: "0.5px solid #848080"
};




const autocompleteStyles = {
  width: "100%",
  "& input": { color: "#fff", },
  '& .MuiInputLabel-root.MuiInputLabel-formControl': { color: '#FFFFFF', },
}

const profileSectionStyles = {
  mt: 4, marginX: "20%", borderRadius: "5px",
  boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.01), 0px 1px 3px 0px rgba(0,0,0,0.14), 0px 1px 1px 1px rgba(0,0,0,0.01)",
}



const legendBox = {
  color: "#35353e",
  background: "#f6f3f3",
  p: 2,
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
  fontSize: "20px"
};

const profileInputStyles = {
  color: "#494949",
  background: "#f6f6f6",
  border: "none",
  '& .MuiFilledInput-root': {
    backgroundColor: "#f6f6f6",
    backgroundColor: "#FFFFFF",
    paddingBottom: "15px",

  },
};

const profileFileInputStyles = {
  color: "#494949",
  background: "#f6f6f6",
  border: "1px solid gray",
  height: "55px",
  '& .MuiFilledInput-root': {
    backgroundColor: "#f6f6f6",
    backgroundColor: "#FFFFFF",
    paddingBottom: "15px",

  },
  "&:hover": {
    color: "#494949",
    background: "#e6e6e6",
    }
};

export const ProfileStyles = {
  pageHeaderStyles: pageHeaderStyles,
  autocompleteStyles: autocompleteStyles,
  profileSectionStyles: profileSectionStyles,
  legendBox: legendBox,
  profileInputStyles: profileInputStyles,
  profileFileInputStyles: profileFileInputStyles,
}
