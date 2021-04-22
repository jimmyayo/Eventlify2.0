import PhotoUploadWidget from 'app/common/imageUpload/PhotoUploadWidget'
import { Photo, Profile } from 'app/models/profile'
import { useStore } from 'app/stores/stores'
import { observer } from 'mobx-react-lite'
import React, { SyntheticEvent, useState } from 'react'
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react'

interface Props {
  profile: Profile
}
export default observer(function ProfilePhotos({ profile }: Props) {
  const {profileStore: { 
    isCurrentUser , uploadPhoto, uploading, 
    loading, setMainPhoto, deletePhoto, deleting}} = useStore();

  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState('');

  function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  }

  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  }

  function handlePhotoDelete(id: string, e: SyntheticEvent<HTMLButtonElement>) {
    setTarget(e.currentTarget.name);
    deletePhoto(id);
  }


  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header icon="image" floated="left" content="Photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? 'Cancel' : 'Add Photo'}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile.photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  {isCurrentUser && (
                    <Button.Group fluid widths={2}>
                      <Button 
                        basic 
                        color='green' 
                        content='Main' 
                        name={photo.id} 
                        disabled={photo.isMain}
                        loading={target === photo.id && loading}
                        onClick={e => handleSetMainPhoto(photo, e)}
                      />
                      <Button 
                        basic 
                        color='red' 
                        icon='trash'
                        disabled={photo.isMain}
                        name={photo.id}
                        loading={target === photo.id && deleting}
                        onClick={e => handlePhotoDelete(photo.id, e)}
                      />
                    </Button.Group>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
})
