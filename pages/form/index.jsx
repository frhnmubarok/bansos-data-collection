import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
  FormLabel,
  FormControl,
  Divider,
  Button,
  ButtonGroup,
  chakra,
  Stack,
  Icon,
  RadioGroup,
  FormErrorMessage,
  Radio,
  HStack,
  Select,
  Checkbox,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { Box, Container, Flex, Heading, StackDivider, Text, VStack } from '@chakra-ui/layout';
import { FiFile, FiSave } from 'react-icons/fi';
import FormInput from '../../components/FormInput';
import FormTextarea from '../../components/FormTextarea';
import FormUpload from '../../components/FormUpload';
import { genderEnum, reasonEnum } from '../../constants/enums';
import server from '../../services/server';
import FormTitle from '../../components/FormTitle';

const index = () => {
  const [fotoKTPPreview, setfotoKTPPreview] = useState(null);
  const [fotoKKPreview, setfotoKKPreview] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const {
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast();
  const router = useRouter();

  const watchReason = watch('reason');

  const onSubmit = (values) => {
    let time = Math.floor(Math.random() * 2500);
    let reason = getValues('reason');
    let otherReason = getValues('otherReason');
    if (otherReason !== undefined && otherReason.length > 0) {
      reason = otherReason;
      delete values.otherReason;
    }

    return server(values, reason, time)
      .then((res) => {
        console.log(res);
        router.push('/form/success');
      })
      .catch((err) => {
        toast({
          title: 'Gagal',
          description: 'Sistem sedang sibuk. Mohon coba lagi dalam beberapa saat.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
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
    <Container py={8} maxW={['container.sm', 'container.sm']} px={4}>
      <FormTitle />
      <Box boxShadow={'md'} rounded={'md'} p={4} borderWidth='1px'>
        <chakra.form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={6} divider={<StackDivider borderColor='gray.400' />} mb={4}>
            <Stack spacing={5}>
              <FormInput
                id='name'
                label='Nama Lengkap'
                placeholder='Masukkan nama lengkap'
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
                      value={genderEnum.MALE}
                      colorScheme='green'>
                      Laki - laki
                    </Radio>
                    <Radio
                      id='gender'
                      {...register('gender', { required: 'Wajib diisi' })}
                      value={genderEnum.FEMALE}
                      colorScheme='green'>
                      Perempuan
                    </Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>

              <FormInput
                id='age'
                label='Umur'
                placeholder='Umur'
                register={register('age', {
                  required: 'Wajib diisi',
                  valueAsNumber: true,
                  min: { value: 25, message: 'Minimal berusia 25 tahun' },
                })}
                error={errors.age}
                suffix='Tahun'
                maxW={'150px'}
                helperText='Berumur lebih dari atau sama dengan 25 tahun'
              />

              <FormInput
                id='nik'
                label='NIK'
                placeholder='Masukkan NIK'
                register={register('nik', {
                  required: 'Wajib diisi',
                  minLength: { value: 16, message: 'Jumlah digit pada NIK minimal 16 digit' },
                  valueAsNumber: true,
                })}
                error={errors.nik}
                helperText='Standar NIK terdiri dari 16 digit'
              />

              <FormInput
                id='no_kk'
                label='Nomor Kartu Keluarga'
                placeholder='Masukkan nomor Kartu Keluarga'
                register={register('no_kk', {
                  required: 'Wajib diisi',
                  minLength: { value: 16, message: 'Jumlah digit pada nomor KK minimal 16 digit' },
                  valueAsNumber: true,
                })}
                error={errors.no_kk}
                helperText='Standar nomor KK terdiri dari 16 digit'
              />
            </Stack>

            <Stack spacing={4}>
              <FormControl id='foto_ktp' isInvalid={!!errors.foto_ktp}>
                <FormUpload
                  name='foto_ktp'
                  label='Foto KTP'
                  error={errors.foto_ktp}
                  accept={'image/*'}
                  multiple
                  register={register('foto_ktp', {
                    required: 'Wajib diisi',
                    validate: validateFiles,
                    onChange: (e) =>
                      e.target.files[0] !== undefined && setfotoKTPPreview(URL.createObjectURL(e.target.files[0])),
                  })}
                  helperText='Ukuran file maksimal 2MB'>
                  <Button leftIcon={<Icon as={FiFile} />} colorScheme='green' variant='outline' fontWeight='medium'>
                    Unggah
                  </Button>
                </FormUpload>
                {fotoKTPPreview && (
                  <Box mt={2}>
                    <Image src={fotoKTPPreview} alt='upload' width={300} height={200} fit='cover' />
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
                  register={register('foto_kk', {
                    required: 'Wajib diisi',
                    validate: validateFiles,
                    onChange: (e) =>
                      e.target.files[0] !== undefined && setfotoKKPreview(URL.createObjectURL(e.target.files[0])),
                  })}
                  helperText='Ukuran file maksimal 2MB'>
                  <Button
                    leftIcon={<Icon as={FiFile} />}
                    colorScheme='green'
                    variant='outline'
                    fontWeight='medium'
                    shadow='sm'>
                    Unggah
                  </Button>
                </FormUpload>
                {fotoKKPreview && (
                  <Box mt={2}>
                    <Image src={fotoKKPreview} alt='upload' width={300} height={200} fit='cover' />
                  </Box>
                )}
              </FormControl>
            </Stack>

            <Stack spacing={4}>
              <FormTextarea
                id='address'
                label='Alamat'
                placeholder='Masukkan alamat lengkap'
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
            </Stack>

            <Stack spacing={4}>
              <FormInput
                id='salaryBefore'
                label='Penghasilan sebelum pandemi'
                placeholder='Masukkan penghasilan sebelum pandemi'
                register={register('salaryBefore', {
                  required: 'Wajib diisi',
                  valueAsNumber: true,
                })}
                error={errors.salaryBefore}
                prefix='Rp.'
              />

              <FormInput
                id='salaryAfter'
                label='Penghasilan setelah pandemi'
                placeholder='Masukkan penghasilan setelah pandemi'
                register={register('salaryAfter', {
                  required: 'Wajib diisi',
                  valueAsNumber: true,
                })}
                error={errors.salaryAfter}
                prefix='Rp.'
              />

              <FormControl id='reason' isInvalid={!!errors.reason}>
                <FormLabel mb={1}>Alasan membutuhkan bantuan</FormLabel>
                <Select
                  placeholder='Pilih alasan'
                  focusBorderColor='green.600'
                  {...register('reason', {
                    required: 'Wajib diisi',
                  })}>
                  <option value={reasonEnum.OPT1}>Kehilangan pekerjaan</option>
                  <option value={reasonEnum.OPT2}>Kepala keluarga terdampak atau korban Covid</option>
                  <option value={reasonEnum.OPT3}>Tergolong fakir/miskin semenjak sebelum Covid</option>
                  <option value='other'>Lainnya</option>
                </Select>
                {watchReason === 'other' && (
                  <FormInput
                    id='otherReason'
                    placeholder='Silahkan isi alasan membutuhkan bantuan'
                    register={register('otherReason', {
                      required: 'Wajib diisi',
                      shouldUnregister: true,
                    })}
                    error={errors.otherReason}
                  />
                )}
                <FormErrorMessage>{errors.reason && errors?.reason.message}</FormErrorMessage>
              </FormControl>
            </Stack>
          </Stack>
          <Divider />
          <Box py={4}>
            <Text fontWeight='semibold' mb={2}>
              Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila ditemukan
              ketidaksesuaian dalam data tersebut.
            </Text>
            <Checkbox colorScheme='green' fontWeight='normal' onChange={() => setIsDisabled(!isDisabled)}>
              Setuju
            </Checkbox>
          </Box>
          <Divider />
          <Flex justify='end'>
            <ButtonGroup spacing={2} colorScheme='green'>
              <Button variant='outline' mt={4} onClick={() => router.push('/')}>
                Batal
              </Button>
              <Button leftIcon={<FiSave />} mt={4} isLoading={isSubmitting} type='submit' isDisabled={isDisabled}>
                Simpan
              </Button>
            </ButtonGroup>
          </Flex>
        </chakra.form>
      </Box>
    </Container>
  );
};

export default index;
