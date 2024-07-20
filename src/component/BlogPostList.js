import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Grid, Typography,Pagination ,CardActionArea,CardContent,Card,CardMedia} from '@mui/material';

const BlogPostList = () => {
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
        axios.get('https://newsapi.org/v2/everything?q=tesla&from=2024-06-19&sortBy=publishedAt&apiKey=a84b647866634dfb9cdcb5ec1126bdd3')
            .then(res => {
                console.log(res.data)
                setPosts(res.data.articles)
               
                setLoader(false)
            }).catch(error => console.log(error))
        console.log()
    }
    useEffect(() => {
        fetchdata();
      }, [currentPage]);

    return (
        <>
           <div style={{width:'1800px',height:'100px',backgroundColor:'black'}}>
           <Typography variant='h6' sx={{color:'white'}}>home</Typography>
           <Typography></Typography>
           <span>|</span>
           <Typography variant='h6' sx={{color:'white'}}>Blog</Typography>
           <Typography></Typography>
           </div>
                <Typography variant='h3'>Blog Posts</Typography>
            <Button onClick={fetchdata}>Fetch Posts</Button>
            {
                loader ? "loading" : 
                <Grid container  >
                {
                    currentPosts.map((item,index) => {
                        return (
                            <Grid  key={index} md={4} padding={1}>
                                 <Card sx={{ width:'70%',height:'100%' ,borderRadius:'10px', boxShadow:'3px 3px 3px 3px lightblue',padding:'3px',marginTop:'3px'}}>
       <Typography  sx={{fontSize:'20px',fontWeight:'bold', color:'DeepSkyBlue'}} >
            {item.title}
          </Typography>
      <CardActionArea>
      <CardMedia
        component="img"
                                            sx={{ height:140 ,width:'100%'}}
                                            image={item.urlToImage}
                                          />
        <CardContent>
         
          <Typography variant="h6" color="blue">
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
    </Card>
                                
                            </Grid>) })}

            </Grid>
          
               
            }
              <Box mt={2} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(Posts.length / postsPerPage)}
              page={currentPage}
              onChange={handleChange}
              color="primary"
            />
          </Box>
        </>

    )

}


export default BlogPostList;