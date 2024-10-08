import ErrorOutline from '@mui/icons-material/ErrorOutline';
import Grid from '@mui/material/Unstable_Grid2';
import { SxProps, Theme, styled, useTheme } from '@mui/material/styles';
import * as React from 'react';

import { Button } from 'src/components/Button/Button';
import { Typography } from 'src/components/Typography';

import { SvgIconProps } from '../SvgIcon';

export interface ErrorStateProps {
  /**
   * An SVG to display in place of the error icon.
   */
  CustomIcon?: React.ComponentType<SvgIconProps>;
  /**
   * CSS properties to apply to the custom icon.
   */
  CustomIconStyles?: React.CSSProperties;
  /**
   * Reduces the padding on the root element.
   */
  compact?: boolean;
  /**
   * The error text to display.
   */
  errorText: JSX.Element | string;
  /**
   * Styles applied to the error text
   */
  typographySx?: SxProps<Theme>;
  /**
   * Optional Action Button: Text
   */
  actionButtonText?: string;
  /**
   * Optional Action Button: Click handler
   */
  onActionButtonClick?: ()=>void;
}

export const ErrorState = (props: ErrorStateProps) => {
  const { CustomIcon, compact, typographySx,
          actionButtonText, onActionButtonClick } = props;
  const theme = useTheme();

  const sxIcon = {
    color: theme.color.red,
    height: 50,
    marginBottom: theme.spacing(2),
    width: 50,
  };

  return (
    <ErrorStateRoot
      alignItems="center"
      compact={compact}
      container
      justifyContent="center"
    >
      <Grid data-testid="error-state">
        <StyledIconContainer>
          {CustomIcon ? (
            <CustomIcon
              data-qa-error-icon
              style={props.CustomIconStyles}
              sx={sxIcon}
            />
          ) : (
            <ErrorOutline data-qa-error-icon sx={sxIcon} />
          )}
        </StyledIconContainer>
        {typeof props.errorText === 'string' ? (
          <Typography
            data-qa-error-msg
            style={{ textAlign: 'center' }}
            sx={typographySx}
            variant="h3"
          >
            {props.errorText}
          </Typography>
        ) : (
          <div style={{ textAlign: 'center' }}>{props.errorText}</div>
        )}
        {actionButtonText ? (
          <div style={{ textAlign: 'center' }}>
            <Button
              title={actionButtonText}
              onClick={() => { onActionButtonClick?.() }}
            >
              {actionButtonText}
            </Button>
          </div>
        ): ( null )}
      </Grid>
    </ErrorStateRoot>
  );
};

const StyledIconContainer = styled('div')({
  textAlign: 'center',
});

const ErrorStateRoot = styled(Grid, {
  label: 'ErrorStateRoot',
  shouldForwardProp: (prop) => prop !== 'compact',
})<Partial<ErrorStateProps>>(({ theme, ...props }) => ({
  marginLeft: 0,
  padding: props.compact ? theme.spacing(5) : theme.spacing(10),
  width: '100%',
}));
