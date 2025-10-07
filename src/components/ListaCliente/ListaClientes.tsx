import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSearch } from "react-icons/fa";
import api from "../services/api";
import Loading from "../Loading/Loading";

type Cliente = {
  id: string;
  nome: string;
  cnpjCpf: string;
  emailContato: string;
  telefone: string;
  cidadeEndereco: string;
  ativo: boolean;
};




/**
 * 
 * 
 * "id": "ab967e12-cb6b-4cc5-bc26-a4e7468c2155",
        "nome": "GF DISTRIBUIDORA DE PECAS LTDA EPP",
        "cnpjCpf": "07.139.978/0001-88",
        "emailContato": "contato@gfpecas.com",
        "telefone": "(41) 99704-8465",
        "cidadeEndereco": "Curitiba",
        "ativo": true,
        "createdAt": "2025-10-07T01:53:34.034Z"
 */