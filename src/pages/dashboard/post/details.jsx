import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { PostDetailsView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export default function PostDetailsPage() {
  const params = useParams();

  const { slug } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Post Details</title>
      </Helmet>

      <PostDetailsView slug={`${slug}`} />
    </>
  );
}
