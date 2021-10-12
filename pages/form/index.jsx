import React, { ReactNode, useRef, useState } from 'react';
import Image from 'next/image';
import { useForm, UseFormRegisterReturn, useController } from 'react-hook-form';
import {
  FormLabel,
  FormControl,
  Input,
  InputLeftAddon,
  Button,
  chakra,
  Stack,
  Icon,
  InputGroup,
  RadioGroup,
  FormErrorMessage,
  Radio,
  HStack,
  Textarea,
  useNumberInput,
  Select,
} from '@chakra-ui/react';

import { Box, Container, Flex, Heading, StackDivider, Text, VStack } from '@chakra-ui/layout';
import { FiFile } from 'react-icons/fi';
import FormInput from '../../components/FormInput';
import FormTextarea from '../../components/FormTextarea';
import FormUpload from '../../components/FormUpload';
import FormUploadImage from '../../components/FormUploadImage';

const index = () => {
  const [image, setImage] = useState('');
  const [fotoKTPPreview, setfotoKTPPreview] = useState(null);
  const [fotoKKPreview, setfotoKKPreview] = useState(null);
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 25,
    min: 25,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const watchReason = watch('reason');

  const onSubmit = (values) => {
    let time = Math.floor(Math.random() * 1500);

    let simulateServer = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (time < 1500) {
          resolve(console.log({ ...values, age: parseInt(values.age) }));
        } else {
          reject(console.log('Timeout'));
        }
      }, time);
    });

    return simulateServer
      .then(() => {
        alert('Succes');
      })
      .catch((err) => {
        alert('Error');
      });
  };

  const validateFiles = (value) => {
    if (value.length < 1) {
      return 'Files is required';
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024);
      const MAX_FILE_SIZE = 2;
      if (fsMb > MAX_FILE_SIZE) {
        return 'Max file size 2mb';
      }
    }
    return true;
  };

  return (
    <Container py={{ base: 12, md: 28 }} maxW={['container.sm', 'container.sm']} px={2}>
      <Box boxShadow={'xl'} rounded={'md'} p={4} borderWidth='1px'>
        <chakra.form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={5} divider={<StackDivider borderColor='gray.200' />}>
            <FormInput
              id='name'
              label='Nama Lengkap'
              placeholder='Nama Lengkap'
              register={register('name', {
                required: 'Wajib diisi',
              })}
              error={errors.name}
            />

            <FormControl id='gender' isInvalid={!!errors.gender}>
              <FormLabel mb={1}>Jenis Kelamin</FormLabel>
              <FormErrorMessage mb={1}>{errors.gender && errors?.gender.message}</FormErrorMessage>
              <RadioGroup>
                <HStack spacing='24px'>
                  <Radio
                    id='gender'
                    {...register('gender', { required: 'Wajib diisi' })}
                    value='male'
                    colorScheme='green'>
                    Laki - laki
                  </Radio>
                  <Radio
                    id='gender'
                    {...register('gender', { required: 'Wajib diisi' })}
                    value='female'
                    colorScheme='green'>
                    Perempuan
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl id='age' isInvalid={!!errors.age}>
              <FormLabel mb={1}>Umur</FormLabel>
              <HStack maxW='180px'>
                <Button {...dec}>-</Button>
                <Input
                  id='age'
                  focusBorderColor='green.600'
                  {...input}
                  {...register('age', {
                    required: 'Wajib diisi',
                  })}
                />
                <Button {...inc}>+</Button>
              </HStack>
              <FormErrorMessage>{errors.age && errors?.age.message}</FormErrorMessage>
            </FormControl>

            <FormInput
              id='nik'
              label='NIK'
              placeholder='NIK'
              register={register('nik', {
                required: 'Wajib diisi',
                minLength: { value: 16, message: 'Jumlah digit pada NIK minimal 16 digit' },
              })}
              error={errors.nik}
              helperText='Standar NIK terdiri atas 16 digit'
            />

            <FormInput
              id='kk'
              label='Nomor Kartu Keluarga'
              placeholder='No KK'
              register={register('kk', {
                required: 'Wajib diisi',
                minLength: { value: 16, message: 'Jumlah digit pada nomor KK minimal 16 digit' },
              })}
              error={errors.kk}
              helperText='Standar nomor KK terdiri atas 16 digit'
            />

            <FormControl id='foto_ktp' isInvalid={!!errors.foto_ktp}>
              <FormUpload
                name='foto_ktp'
                label='Foto KTP'
                error={errors.foto_ktp}
                accept={'image/*'}
                multiple
                register={register('foto_ktp', { required: 'Wajib diisi', validate: validateFiles })}
                imagePreview={setfotoKTPPreview}>
                <Button leftIcon={<Icon as={FiFile} />}>Unggah</Button>
              </FormUpload>
              {fotoKTPPreview && (
                <Box mt={2}>
                  <Image
                    src={(fotoKTPPreview)}
                    rounded={'md'}
                    alt='upload'
                    width={280}
                    height={200}
                    fit='cover'
                  />
                </Box>
              )}
            </FormControl>

            <FormControl id='foto_kk' isInvalid={!!errors.foto_kk}>
              <FormUpload
                id='foto_kk'
                label='Foto Kartu Keluarga'
                error={errors.foto_kk}
                accept={'image/*'}
                multiple
                register={register('foto_kk', { required: 'Wajib diisi', validate: validateFiles })}
                imagePreview={setfotoKKPreview}>
                <Button leftIcon={<Icon as={FiFile} />}>Unggah</Button>
              </FormUpload>
              {fotoKKPreview && (
                <Box mt={2} rounded={'lg'} overflow='hidden'>
                  <Image src={fotoKKPreview} rounded={'md'} alt='upload' width={280} height={200} fit='cover' />
                </Box>
              )}
            </FormControl>

            {/* <FormControl id='foto_ktp' isInvalid={!!errors.foto_ktp}>
              <FormUploadImage
                name='file'
                control={control} //notice this
                placeholder='Pilih bukti pembayaran'
                acceptedFileTypes='image/png, image/jpeg'
                isRequired
                imagePreview={setfotoKTPPreview}
                register={register('foto_ktp', { required: 'Wajib diisi', validate: validateFiles })}>
                Bukti bayar
              </FormUploadImage>
              {fotoKTPPreview && (
                <Box mt={2}>
                  <Image
                    src={URL.createObjectURL(fotoKTPPreview)}
                    rounded={'md'}
                    alt='upload'
                    width={280}
                    height={200}
                    fit='cover'
                  />
                </Box>
              )}
            </FormControl>

            <FormControl id='foto_kk' isInvalid={!!errors.foto_kk}>
              <FormUploadImage
                name='file'
                control={control} //notice this
                placeholder='Pilih bukti pembayaran'
                acceptedFileTypes='image/png, image/jpeg'
                isRequired
                imagePreview={setfotoKKPreview}
                register={register('foto_kk', { required: 'Wajib diisi', validate: validateFiles })}>
                Bukti bayar
              </FormUploadImage>
              {fotoKKPreview && (
                <Box mt={2}>
                  <Image
                    src={URL.createObjectURL(fotoKKPreview)}
                    rounded={'md'}
                    alt='upload'
                    width={280}
                    height={200}
                    fit='cover'
                  />
                </Box>
              )}
            </FormControl> */}

            <FormTextarea
              id='address'
              label='Alamat'
              placeholder='Alamat lengkap'
              register={register('address', {
                required: 'Wajib diisi',
              })}
              error={errors.address}
            />

            <HStack spacing='20px'>
              <FormInput
                id='rt'
                label='RT'
                placeholder='RT'
                register={register('rt', {
                  required: 'Wajib diisi',
                })}
                error={errors.rt}
              />

              <FormInput
                id='rw'
                label='RW'
                placeholder='RW'
                register={register('rw', {
                  required: 'Wajib diisi',
                })}
                error={errors.rw}
              />
            </HStack>

            <FormInput
              id='salaryBefore'
              label='Penghasilan sebelum pandemi'
              placeholder='Penghasilan sebelum pandemi'
              register={register('salaryBefore', {
                required: 'Wajib diisi',
              })}
              error={errors.salaryBefore}
              suffix='Rp.'
            />

            <FormInput
              id='salaryAfter'
              label='Penghasilan setelah pandemi'
              placeholder='Penghasilan setelah pandemi'
              register={register('salaryAfter', {
                required: 'Wajib diisi',
              })}
              error={errors.salaryAfter}
              suffix='Rp.'
            />

            <FormControl id='reason' isInvalid={!!errors.reason}>
              <FormLabel mb={1}>Alasan membutuhkan bantuan</FormLabel>
              <Select
                placeholder='Pilih alasan'
                focusBorderColor='green.600'
                {...register('reason', {
                  required: 'Wajib diisi',
                })}>
                <option value='Kepala keluarga terdampak atau korban Covid'>
                  Kepala keluarga terdampak atau korban Covid
                </option>
                <option value='Tergolong fakir/miskin semenjak sebelum Covid'>
                  Tergolong fakir/miskin semenjak sebelum Covid
                </option>
                <option value='other'>Lainnya</option>
              </Select>
              {watchReason === 'other' && (
                <FormInput
                  id='otherReason'
                  placeholder='Silahkan isi alasan membutuhkan bantuan'
                  register={register('otherReason', {
                    required: 'Wajib diisi',
                  })}
                  error={errors.otherReason}
                />
              )}
              <FormErrorMessage>{errors.reason && errors?.reason.message}</FormErrorMessage>
            </FormControl>
          </Stack>
          <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
            Submit
          </Button>
        </chakra.form>
      </Box>
    </Container>
  );
};

export default index;
