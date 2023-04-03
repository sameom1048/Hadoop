package com.hadoop.demo.Service;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Model.GpuList;
import com.hadoop.demo.Repository.CpuListRepository;
import com.hadoop.demo.Repository.GpuListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GpuListService {

    @Autowired
    private GpuListRepository gpuListRepository;

    public GpuList save(GpuList gpuList) {
        return gpuListRepository.save(gpuList);
    }

    public List<GpuList> findAll() { return gpuListRepository.findAll();}

}