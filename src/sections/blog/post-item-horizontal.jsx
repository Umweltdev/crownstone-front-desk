import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import axiosInstance from 'src/utils/axios';
import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import TextMaxLine from 'src/components/text-max-line';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function PostItemHorizontal({ post, refreshPosts, route }) {
  const popover = usePopover();

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const smUp = useResponsive('up', 'sm');

  const {
    title,
    _id,
    author,
    image,
    date,
    totalViews,
    totalShares,
    totalComments,
    description,
    slug,
  } = post;

  const onDelete = async () => {
    try {
      await axiosInstance.delete(`/api/${route === 'post' ? 'blog' : 'event'}/${_id}`);
      enqueueSnackbar('Deleted Successfully!');
      refreshPosts();
      // console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Stack component={Card} direction="row">
        <Stack
          sx={{
            p: (theme) => theme.spacing(3, 3, 2, 3),
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            {/* <Label variant="soft" color={(publish === 'published' && 'info') || 'default'}>
              {publish}
            </Label> */}

            <Box component="span" sx={{ typography: 'caption', color: 'text.disabled' }}>
              {fDate(date)}
            </Box>
          </Stack>

          <Stack spacing={1} flexGrow={1}>
            <Link
              color="inherit"
              component={RouterLink}
              href={paths.dashboard[route].details(slug)}
            >
              <TextMaxLine variant="subtitle2" line={2}>
                {title}
              </TextMaxLine>
            </Link>

            <TextMaxLine variant="body2" sx={{ color: 'text.secondary' }}>
              {description}
            </TextMaxLine>
          </Stack>

          <Stack direction="row" alignItems="center">
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-horizontal-fill" />
            </IconButton>

            <Stack
              spacing={1.5}
              flexGrow={1}
              direction="row"
              flexWrap="wrap"
              justifyContent="flex-end"
              sx={{
                typography: 'caption',
                color: 'text.disabled',
              }}
            >
              <Stack direction="row" alignItems="center">
                <Iconify icon="eva:message-circle-fill" width={16} sx={{ mr: 0.5 }} />
                {fShortenNumber(totalComments)}
              </Stack>

              <Stack direction="row" alignItems="center">
                <Iconify icon="solar:eye-bold" width={16} sx={{ mr: 0.5 }} />
                {fShortenNumber(totalViews)}
              </Stack>

              <Stack direction="row" alignItems="center">
                <Iconify icon="solar:share-bold" width={16} sx={{ mr: 0.5 }} />
                {fShortenNumber(totalShares)}
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        {smUp && (
          <Box
            sx={{
              width: 180,
              height: 240,
              position: 'relative',
              flexShrink: 0,
              p: 1,
            }}
          >
            {author && (
              <Avatar
                alt={author?.firstName}
                src={author?.image}
                sx={{ position: 'absolute', top: 16, right: 16, zIndex: 9 }}
              />
            )}
            <Image alt={title} src={image} sx={{ height: 1, borderRadius: 1.5 }} />
          </Box>
        )}
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="bottom-center"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            router.push(paths.dashboard[route].details(_id));
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            router.push(paths.dashboard[route].edit(_id));
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            onDelete();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}

PostItemHorizontal.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    author: PropTypes.object,
    image: PropTypes.string,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    description: PropTypes.string,
    publish: PropTypes.string,
    title: PropTypes.string,
    totalComments: PropTypes.number,
    totalShares: PropTypes.number,
    totalViews: PropTypes.number,
    slug: PropTypes.string,
  }),
  refreshPosts: PropTypes.any,
  route: PropTypes.string,
};
