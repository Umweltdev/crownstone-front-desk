import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetPost } from 'src/api/blog';
import { POST_PUBLISH_OPTIONS } from 'src/_mock';

import Iconify from 'src/components/iconify';
// import Markdown from 'src/components/markdown';
import EmptyContent from 'src/components/empty-content';

import PostDetailsHero from '../post-details-hero';
import { PostDetailsSkeleton } from '../post-skeleton';
import PostDetailsToolbar from '../post-details-toolbar';

// ----------------------------------------------------------------------

export default function PostDetailsView({ slug }) {
  const [publish, setPublish] = useState('');

  const { post, postLoading, postError } = useGetPost(slug);
  const handleChangePublish = useCallback((newValue) => {
    setPublish(newValue);
  }, []);

  useEffect(() => {
    if (post) {
      setPublish(post?.publish);
    }
  }, [post]);

  const renderSkeleton = <PostDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`${postError?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.dashboard.post.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Back to List
        </Button>
      }
      sx={{
        py: 20,
      }}
    />
  );

  const renderPost = post && (
    <>
      <PostDetailsToolbar
        backLink={paths.dashboard.post.root}
        editLink={paths.dashboard.post.edit(`${post?._id}`)}
        liveLink={paths.post.details(`${post?._id}`)}
        publish={publish || ''}
        onChangePublish={handleChangePublish}
        publishOptions={POST_PUBLISH_OPTIONS}
      />

      <PostDetailsHero title={post?.title} coverUrl={post?.image} />

      <Stack
        sx={{
          maxWidth: 720,
          mx: 'auto',
          mt: { xs: 5, md: 10 },
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 5 }}>
          {post.description}
        </Typography>

        <div
          className="mt-[20px] mr-5 xl:text-[20px] sm:text-[18px] text-[16px]"
          dangerouslySetInnerHTML={{
            __html: post?.content,
          }}
        />

        {/* <Markdown children={post.content} /> */}

        {/* <Stack
          spacing={3}
          sx={{
            py: 3,
            borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Stack direction="row" flexWrap="wrap" spacing={1}>
            {post?.tags?.map((tag) => (
              <Chip key={tag} label={tag} variant="soft" />
            ))}
          </Stack>

          <Stack direction="row" alignItems="center">
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  size="small"
                  color="error"
                  icon={<Iconify icon="solar:heart-bold" />}
                  checkedIcon={<Iconify icon="solar:heart-bold" />}
                />
              }
              label={fShortenNumber(post.totalFavorites)}
              sx={{ mr: 1 }}
            />

            <AvatarGroup
              sx={{
                [`& .${avatarGroupClasses.avatar}`]: {
                  width: 32,
                  height: 32,
                },
              }}
            >
              {post?.favoritePerson?.map((person) => (
                <Avatar key={person?.name} alt={person?.name} src={person?.avatarUrl} />
              ))}
            </AvatarGroup>
          </Stack>
        </Stack> */}

        {/* <Stack direction="row" sx={{ mb: 3, mt: 5 }}>
          <Typography variant="h4">Comments</Typography>

          <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
            ({post?.comments?.length})
          </Typography>
        </Stack> */}

        {/* <PostCommentForm /> */}

        {/* <Divider sx={{ mt: 5, mb: 2 }} /> */}

        {/* <PostCommentList comments={post?.comments} /> */}
      </Stack>
    </>
  );

  return (
    <Container maxWidth={false}>
      {postLoading && renderSkeleton}

      {postError && renderError}

      {post && renderPost}
    </Container>
  );
}

PostDetailsView.propTypes = {
  slug: PropTypes.string,
};
