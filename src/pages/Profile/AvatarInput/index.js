import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';

import api from '~/services/api';

import { Container } from './styles';

export default function AvatarInput() {
  const { defaultValue, registerField } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [previewUrl, setPreviewUrl] = useState(
    defaultValue && defaultValue.url
  );

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  async function handlechange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreviewUrl(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={
            previewUrl ||
            'https://api.adorable.io/avatars/50/abott@adorable.png'
          }
          alt=""
        />

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handlechange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
