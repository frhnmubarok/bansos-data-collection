import React, { useState, useEffect } from 'react';
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
import { Box, Container, Flex, StackDivider, Text } from '@chakra-ui/layout';
import { FiFile, FiSave } from 'react-icons/fi';
import FormInput from '../../components/FormInput';
import FormTextarea from '../../components/FormTextarea';
import FormUpload from '../../components/FormUpload';
import { genderEnum, reasonEnum } from '../../constants/enums';
import server from '../../services/server';
import FormTitle from '../../components/FormTitle';
import validateFiles from '../../utils/validateFiles';
import imageResizer from '../../utils/imageResizer';

const index = () => {
  const [fotoKTPPreview, setfotoKTPPreview] = useState(null);
  const [fotoKKPreview, setfotoKKPreview] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [compressedKTP, setCompressedKTP] = useState(null);
  const [compressedKK, setCompressedKK] = useState(null);
  const {
    handleSubmit,
    register,
    watch,
    getValues,
    setError,
    clearErrors,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast();
  const router = useRouter();

  const watchReason = watch('reason');

  useEffect(() => {
    if (watchReason === 'other') setFocus('otherReason');
  }, [watchReason]);

  const onSubmit = async (values) => {
    let reason = getValues('reason');
    let otherReason = getValues('otherReason');
    if (otherReason !== undefined && otherReason.length > 0) {
      reason = otherReason;
      delete values.otherReason;
    }

    const data = { ...values, reason, foto_ktp: compressedKTP, foto_kk: compressedKK };

    return server(data)
      .then((res) => {
        console.log(res);
        router.push('/form/success');
      })
      .catch((err) => {
        console.log(err);
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

  return (
    <Container py={8} maxW={['container.sm', 'container.sm']} px={4}>
      <FormTitle />
      <Box boxShadow={'md'} rounded={'md'} p={4} borderWidth='1px'>
        <chakra.form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={'2rem'} divider={<StackDivider borderColor='gray.200' />} mb={4} pt={4}>
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
                onChange: (e) => {
                  if (e.target.value < 25)
                    setError('age', {
                      type: 'manual',
                      message: 'Minimal berusia 25 tahun',
                    });
                  else clearErrors('age');
                },
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
                minLength: { value: 16, message: 'Jumlah digit pada NIK adalah 16 digit' },
                maxLength: { value: 16, message: 'Jumlah digit pada NIK adalah 16 digit' },
                onChange: (e) => {
                  if (e.target.value.length !== 16)
                    setError('nik', {
                      type: 'manual',
                      message: 'Jumlah digit pada NIK adalah 16 digit',
                    });
                  else clearErrors('nik');
                },
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
                minLength: { value: 16, message: 'Jumlah digit pada nomor KK adalah 16 digit' },
                maxLength: { value: 16, message: 'Jumlah digit pada nomor KK adalah 16 digit' },
                onChange: (e) => {
                  if (e.target.value.length !== 16)
                    setError('no_kk', {
                      type: 'manual',
                      message: 'Jumlah digit pada nomor KK adalah 16 digit',
                    });
                  else clearErrors('no_kk');
                },
              })}
              error={errors.no_kk}
              helperText='Standar nomor KK terdiri dari 16 digit'
            />

            <FormControl id='foto_ktp' isInvalid={!!errors.foto_ktp}>
              <FormUpload
                name='foto_ktp'
                label='Foto KTP'
                error={errors.foto_ktp}
                register={register('foto_ktp', {
                  required: 'Wajib diisi',
                  validate: validateFiles,
                  onChange: async (e) => {
                    const file = e.target.files[0];
                    if (file !== undefined) setfotoKTPPreview(URL.createObjectURL(file));
                    setCompressedKTP(await imageResizer(file));
                  },
                })}
                helperText='Ukuran file maksimal 2MB'>
                <Button
                  leftIcon={<Icon as={FiFile} />}
                  colorScheme='green'
                  variant='outline'
                  fontWeight='medium'
                  shadow='base'>
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
                register={register('foto_kk', {
                  required: 'Wajib diisi',
                  validate: validateFiles,
                  onChange: async (e) => {
                    const file = e.target.files[0];
                    if (file !== undefined) setfotoKKPreview(URL.createObjectURL(file));
                    setCompressedKK(await imageResizer(file));
                  },
                })}
                helperText='Ukuran file maksimal 2MB'>
                <Button
                  leftIcon={<Icon as={FiFile} />}
                  colorScheme='green'
                  variant='outline'
                  fontWeight='medium'
                  shadow='base'>
                  Unggah
                </Button>
              </FormUpload>
              {fotoKKPreview && (
                <Box mt={2}>
                  <Image src={fotoKKPreview} alt='upload' width={300} height={200} fit='cover' />
                </Box>
              )}
            </FormControl>

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
                mb={4}
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
          <Divider />
          <Box py={4}>
            <Text fontWeight='semibold' mb={2}>
              Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila ditemukan
              ketidaksesuaian dalam data tersebut.
            </Text>
            <Checkbox colorScheme='green' fontWeight='normal' onChange={() => setIsDisabled(!isDisabled)} size='lg'>
              Setuju
            </Checkbox>
          </Box>
          <Divider />
          <Flex justify='end'>
            <ButtonGroup spacing={2} colorScheme='green'>
              <Button variant='outline' shadow='base' mt={4} onClick={() => router.push('/')}>
                Batal
              </Button>
              <Button
                leftIcon={<FiSave />}
                shadow='base'
                mt={4}
                isLoading={isSubmitting}
                loadingText='Menyimpan'
                type='submit'
                isDisabled={isDisabled}>
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
