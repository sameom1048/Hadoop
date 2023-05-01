package com.hadoop.demo.Service;

import com.hadoop.demo.Model.BottleNeck;
import com.hadoop.demo.Repository.BottleNeckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BottleNeckService {

    @Autowired
    private BottleNeckRepository bottleNeckRepository;

    public BottleNeck save(BottleNeck bottleNeck) {
        return bottleNeckRepository.save(bottleNeck);
    }

    public List<BottleNeck> findAll() { return bottleNeckRepository.findAll();}

    public List<BottleNeck> findByCpuName(String name) {
        return bottleNeckRepository.findByCpuInfo(name);
    }

    public List<BottleNeck> findByGpuName(String name) {
        return bottleNeckRepository.findByGpuInfo(name);
    }

    public BottleNeck searchByCpuInfoAndGpuInfo(String cpuInfo, String gpuInfo) { return bottleNeckRepository.findByCpuInfoAndGpuInfo(cpuInfo, gpuInfo);}


}