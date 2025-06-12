import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RefusalsData {
  noOfRefusals: string;
  location: string;
}

interface PersonWithDisabilityData {
  noOfPersonWithDisability: string;
  descriptionAndLocation: string;
}

interface SignOfDangerData {
  signOfDanger: string;
}

interface AdditionalDetails {
  notes: string;
}

interface ImageFile {
  uri: string;
  name: string;
  timestamp: Date;
  type: 'image/jpeg' | 'image/png';
}

interface AudioRecording {
  uri: string;
  name: string;
  timestamp: Date;
  duration: number;
}

interface FormDataContextProps {
  refusalsData: RefusalsData;
  setRefusalsData: (data: RefusalsData) => void;
  personWithDisabilityData: PersonWithDisabilityData;
  setPersonWithDisabilityData: (data: PersonWithDisabilityData) => void;
  signOfDangerData: SignOfDangerData;
  setSignOfDangerData: (data: SignOfDangerData) => void;
  additionalDetails: AdditionalDetails;
  setAdditionalDetails: (data: AdditionalDetails) => void;
  audioRecordings: AudioRecording[];
  setAudioRecordings: (data: AudioRecording[]) => void;
  images: ImageFile[];
  setImages: (data: ImageFile[]) => void;
}

const FormDataContext = createContext<FormDataContextProps | undefined>(undefined);

export const FormDataProvider = ({ children }: { children: ReactNode }) => {
  const [refusalsData, setRefusalsData] = useState<RefusalsData>({ noOfRefusals: '', location: '' });
  const [personWithDisabilityData, setPersonWithDisabilityData] = useState<PersonWithDisabilityData>({
    noOfPersonWithDisability: '',
    descriptionAndLocation: '',
  });
  const [signOfDangerData, setSignOfDangerData] = useState<SignOfDangerData>({ signOfDanger: '' });
  const [additionalDetails, setAdditionalDetails] = useState<AdditionalDetails>({ notes: '' });
  const [audioRecordings, setAudioRecordings] = useState<AudioRecording[]>([]);
  const [images, setImages] = useState<ImageFile[]>([]);
  return (
    <FormDataContext.Provider
      value={{
        refusalsData,
        setRefusalsData,
        personWithDisabilityData,
        setPersonWithDisabilityData,
        signOfDangerData,
        setSignOfDangerData,
        additionalDetails,
        setAdditionalDetails,
        audioRecordings,
        setAudioRecordings,
        images,
        setImages,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
};
