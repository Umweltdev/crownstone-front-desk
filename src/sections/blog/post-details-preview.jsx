import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';

// import Markdown from 'src/components/markdown';
import Scrollbar from 'src/components/scrollbar';
import EmptyContent from 'src/components/empty-content';

import PostDetailsHero from './post-details-hero';

// ----------------------------------------------------------------------

export default function PostDetailsPreview({
  title,
  coverUrl,
  content,
  description,
  //
  open,
  isValid,
  onClose,
  onSubmit,
  isSubmitting,
}) {
  const hasContent = title || description || content || coverUrl;

  const hasHero = title || coverUrl;
  console.log(coverUrl);
  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Preview
        </Typography>

        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          disabled={!isValid}
          loading={isSubmitting}
          onClick={onSubmit}
        >
          Post
        </LoadingButton>
      </DialogActions>

      <Divider />

      {hasContent ? (
        <Scrollbar>
          {hasHero && <PostDetailsHero title={title} coverUrl={coverUrl} />}

          <Container sx={{ mt: 5, mb: 10 }}>
            <Stack
              sx={{
                maxWidth: 720,
                mx: 'auto',
              }}
            >
              <Typography variant="h6" sx={{ mb: 5 }}>
                {description}
              </Typography>

              <div
                className="mt-[20px] mr-5 xl:text-[20px] sm:text-[18px] text-[16px]"
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
            </Stack>
          </Container>
        </Scrollbar>
      ) : (
        <EmptyContent filled title="Empty Content!" />
      )}
    </Dialog>
  );
}

PostDetailsPreview.propTypes = {
  content: PropTypes.string,
  coverUrl: PropTypes.string,
  description: PropTypes.string,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
};
