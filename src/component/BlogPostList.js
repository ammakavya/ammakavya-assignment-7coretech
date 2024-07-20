import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

import {
  Box,
  Button,
  Grid,
  Typography,
  Pagination,
  CardActionArea,
  CardContent,
  Card,
  CardMedia,
} from "@mui/material";

const BlogPostList = () => {
  const StyledCardMedia = styled(CardMedia)({
    height: "100%",
  });
  const StyledCard = styled(Card)({
    position: "relative",
    width: 345,
    height: 370,
  });
  const [loader, setLoader] = useState(true);
  const [Posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Posts.slice(indexOfFirstPost, indexOfLastPost);
  
  const fetchdata = () => {
    axios
      .get(
        "https://newsapi.org/v2/everything?q=tesla&from=2024-06-20&sortBy=publishedAt&apiKey=a84b647866634dfb9cdcb5ec1126bdd3"
      )
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.articles);
        setLoader(false);
      })
      .catch((error) => console.log(error));

  };
  useEffect(() => {
    fetchdata();
  }, [currentPage]);

  return (
    <Box sx={{ backgroundColor: "#21618C " }}>
      <Button variant="h2" onClick={fetchdata}>
        Blog Posts
      </Button>
      {loader ? (
        "loading"
      ) : (
        <Grid container>
          {currentPosts.map((item, index) => {
            return (
              <Grid key={index} md={4} padding={1}>
                <StyledCard>
                  <CardActionArea>
                    <StyledCardMedia component="img" image={item.urlToImage} />
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: "Medium",
                        color: "black",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <CardContent>
                      <Typography sx={{ marginLeft: "45%" }} color="blue">
                        {item.publishedAt}
                      </Typography>
                    </CardContent>
                    <Button
                      component={Link}
                      to={`/post/${index}}`}
                      variant="contained"
                      color="primary"
                    >
                      Read More
                    </Button> 
                  </CardActionArea>
                </StyledCard>
              </Grid>
            );
          })}
        </Grid>
      )}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(Posts.length / postsPerPage)}
          page={currentPage}
          onChange={handleChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default BlogPostList;
