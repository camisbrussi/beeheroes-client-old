import {
  Box,
  Text,
  Image,
  HStack,
  Stack,
  Divider,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { AiOutlineCalendar, AiOutlineExclamationCircle } from "react-icons/ai";
import moment from "moment";

import { Header } from "../../components/Header";
import { api } from "../../services/apiCLient";
import { Button } from "../../components/Button";

import { Loading } from "../../components/Loading";
import { Project } from "../../@types/project";
import { Subscription } from "../../@types/subscritptions";
import { AddressData } from "../../components/Infos/Address";
import OrganizationData from "../organization/view/[slug]";
import { OrganizationInfos } from "../../components/Infos/Organizations";
import { ProfileAvatar } from "../../components/ProfileAvatar";

interface ProjectProps {
  project: Project;
  subscriptions: Subscription[];
}

export default function User({ project, subscriptions }: ProjectProps) {
  const startDate = moment(project?.start).format("DD/MM/YYYY, h:mm");
  const endDate = moment(project?.end).format("DD/MM/YYYY, h:mm");

  return (
    <Box w="100%" minW={1440}>
      <Header />
      {project ? (
        <>
          <HStack
            spacing="20"
            justify="space-between"
            w={1160}
            mt={20}
            mx="auto"
          >
            <Stack>
              <Text as="h1" fontSize="5xl">
                {project?.name}
              </Text>

              <Text fontSize="lg">{project?.description}</Text>
              <Flex align="center">
                <Icon as={AiOutlineCalendar} mx="2" color="green" />
                <Text fontSize="md">{startDate}</Text>
                <Text fontSize="xs" ml="1">
                  (Início)
                </Text>
              </Flex>
              {endDate && (
                <Flex align="center" mt="2">
                  <Icon as={AiOutlineCalendar} mx="2" color="red" />
                  <Text fontSize="md">{endDate}</Text>
                  <Text fontSize="xs" ml="1">
                    (Fim)
                  </Text>
                </Flex>
              )}
              <Flex align="center" mt="2" mb="20">
                {project?.vacancies ? (
                  <Text fontSize="md">
                    {project?.total_subscription < project?.vacancies ? (
                      <Icon
                        as={AiOutlineExclamationCircle}
                        mx="2"
                        color="green"
                      />
                    ) : (
                      <Icon
                        as={AiOutlineExclamationCircle}
                        mx="2"
                        color="red"
                      />
                    )}
                    {project?.total_subscription}/{project?.vacancies} Vagas
                    Preenchidas
                  </Text>
                ) : (
                  <Text fontSize="md">
                    <Icon
                      as={AiOutlineExclamationCircle}
                      mx="2"
                      color="green"
                    />
                    Entrada Livre
                  </Text>
                )}
              </Flex>
              <Button title="Fazer Inscrição" />
            </Stack>
            <Image
              ml="10px"
              objectFit="cover"
              borderRadius="10"
              src="/images/workbee.svg"
              alt="Desenho de uma abelha carregando mel em seu carrinho"
            />
          </HStack>
          {project?.address && (
            <Box w={1160} mt={20} mx="auto" fontSize="lg">
              <Divider mt="20px" />
              <Text mt={5} mb={5}>
                Local Do evento
              </Text>
              <AddressData data={project?.address} />
            </Box>
          )}

          <Box w={1160} mt={20} mx="auto" fontSize="lg">
            <Divider mt="20px" />
            <Text mt={5}>Organização Responsável pelo evento</Text>

            <OrganizationInfos data={project?.organization} hasVisitButton />
          </Box>

          <Box w={1160} mt={20} mx="auto" fontSize="lg">
            <Divider mt="20px" />
            <Text mt={5}>Voluntários aceitos no projeto</Text>

            {subscriptions?.map((subscription) => (
              <ProfileAvatar
                key={subscription.id}
                data={subscription.volunteer}
              />
            ))}
          </Box>
        </>
      ) : (
        <Loading />
      )}
    </Box>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let project: Project;
  let subscriptions: Subscription[];

  const { slug } = params;

  await api.get<Project>(`/projects/find/?id=${slug}`).then((response) => {
    project = response.data;
  });

  await api
    .get<Subscription[]>(`/subscriptions/project/?id=${project.id}`)
    .then((response) => {
      subscriptions = response.data;
    });

  return {
    props: {
      project,
      subscriptions,
    },
    revalidate: 60 * 60, // 1 hour,
  };
};
